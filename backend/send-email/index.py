import json
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка заявки голосового актёра на почту разработчика"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    contact = body.get('contact', '').strip()
    role = body.get('role', '').strip()
    message = body.get('message', '').strip()

    if not name or not contact:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Name and contact are required'})
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    sender = 'sofiya.ivolga@mail.ru'
    recipient = 'sofiya.ivolga@mail.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'🎙️ Новая заявка на озвучку — {name}'
    msg['From'] = sender
    msg['To'] = recipient

    html = f"""
    <html><body style="font-family: Arial, sans-serif; background: #36393f; color: #dcddde; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background: #2f3136; border-radius: 8px; padding: 24px;">
        <h2 style="color: #5865f2; margin-top: 0;">🎙️ Новая заявка на озвучку</h2>
        <p style="color: #b9bbbe; margin-bottom: 20px;">Кто-то хочет поучаствовать в моде <strong style="color: white;">Arika Aishi</strong>!</p>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #8e9297; font-size: 12px; text-transform: uppercase;">Имя / Псевдоним</td></tr>
          <tr><td style="padding: 4px 0 16px; color: white; font-size: 16px; font-weight: bold;">{name}</td></tr>
          <tr><td style="padding: 8px 0; color: #8e9297; font-size: 12px; text-transform: uppercase;">Контакт</td></tr>
          <tr><td style="padding: 4px 0 16px; color: #5865f2; font-size: 15px;">{contact}</td></tr>
          {"<tr><td style='padding: 8px 0; color: #8e9297; font-size: 12px; text-transform: uppercase;'>Опыт озвучки</td></tr><tr><td style='padding: 4px 0 16px; color: #dcddde;'>" + role + "</td></tr>" if role else ""}
          {"<tr><td style='padding: 8px 0; color: #8e9297; font-size: 12px; text-transform: uppercase;'>Сообщение</td></tr><tr><td style='padding: 4px 0 16px; color: #dcddde;'>" + message.replace('\n', '<br>') + "</td></tr>" if message else ""}
        </table>
        <hr style="border-color: #40444b; margin: 20px 0;">
        <p style="color: #72767d; font-size: 12px; margin: 0;">Заявка отправлена через сайт VoiceMod Hub — Ruika Saki Mod Arika Aishi</p>
      </div>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(sender, smtp_password)
        server.sendmail(sender, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
