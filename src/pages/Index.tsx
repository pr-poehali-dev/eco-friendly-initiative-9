import { useState, useRef } from "react";
import {
  Shield,
  Mic,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Hash,
  Users,
  ArrowRight,
  Upload,
  FileAudio,
  MessageSquare,
  Star,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", role: "", message: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#36393f] text-white overflow-x-hidden">
      {/* Навигация в стиле Discord */}
      <nav className="bg-[#2f3136] border-b border-[#202225] px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center">
              <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">VoiceMod Hub</h1>
              <p className="text-xs text-[#b9bbbe] hidden sm:block">Ищем голосовых актёров для мода</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <Button
              className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium"
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            >
              Оставить заявку
            </Button>
          </div>
          <Button
            variant="ghost"
            className="sm:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-[#202225]">
            <Button
              className="bg-[#5865f2] hover:bg-[#4752c4] text-white px-6 py-2 rounded text-sm font-medium w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Оставить заявку
            </Button>
          </div>
        )}
      </nav>

      {/* Макет в стиле Discord */}
      <div className="flex min-h-screen">
        {/* Боковая панель серверов */}
        <div className="hidden lg:flex w-[72px] bg-[#202225] flex-col items-center py-3 gap-2">
          <div className="w-12 h-12 bg-[#5865f2] rounded-2xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer">
            <Mic className="w-6 h-6 text-white" />
          </div>
          <div className="w-8 h-[2px] bg-[#36393f] rounded-full"></div>
          {["🎙️", "🎧", "🎮", "✨"].map((emoji, i) => (
            <div
              key={i}
              className="w-12 h-12 bg-[#36393f] rounded-3xl hover:rounded-xl transition-all duration-200 flex items-center justify-center cursor-pointer hover:bg-[#5865f2] text-lg"
            >
              {emoji}
            </div>
          ))}
        </div>

        {/* Основной контент */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Боковая панель каналов */}
          <div className={`${mobileSidebarOpen ? "block" : "hidden"} lg:block w-full lg:w-60 bg-[#2f3136] flex flex-col`}>
            <div className="p-4 border-b border-[#202225] flex items-center justify-between">
              <h2 className="text-white font-semibold text-base">VoiceMod Hub</h2>
              <Button
                variant="ghost"
                className="lg:hidden text-[#b9bbbe] hover:text-white hover:bg-[#40444b] p-1"
                onClick={() => setMobileSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 p-2">
              <div className="mb-4">
                <div className="flex items-center gap-1 px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
                  <ArrowRight className="w-3 h-3" />
                  <span>Информация</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {["о-проекте", "требования", "примеры", "faq"].map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer"
                    >
                      <Hash className="w-4 h-4" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 px-2 py-1 text-[#8e9297] text-xs font-semibold uppercase tracking-wide">
                  <ArrowRight className="w-3 h-3" />
                  <span>Подать заявку</span>
                </div>
                <div className="mt-1 space-y-0.5">
                  {["отправить-озвучку", "прослушивание"].map((channel) => (
                    <div
                      key={channel}
                      className="flex items-center gap-1.5 px-2 py-1 rounded text-[#8e9297] hover:text-[#dcddde] hover:bg-[#393c43] cursor-pointer"
                    >
                      <Mic className="w-4 h-4" />
                      <span className="text-sm">{channel}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Область пользователя */}
            <div className="p-2 bg-[#292b2f] flex items-center gap-2">
              <div className="w-8 h-8 bg-[#5865f2] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">М</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm font-medium truncate">Ruika Saki Mod Arika Aishi</div>
                <div className="text-[#3ba55c] text-xs truncate">● В сети</div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]">
                  <Mic className="w-4 h-4 text-[#b9bbbe]" />
                </Button>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-[#40444b]">
                  <Settings className="w-4 h-4 text-[#b9bbbe]" />
                </Button>
              </div>
            </div>
          </div>

          {/* Область чата */}
          <div className="flex-1 flex flex-col">
            {/* Заголовок чата */}
            <div className="h-12 bg-[#36393f] border-b border-[#202225] flex items-center px-4 gap-2">
              <Button
                variant="ghost"
                className="lg:hidden text-[#8e9297] hover:text-[#dcddde] hover:bg-[#40444b] p-1 mr-2"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Mic className="w-5 h-5 text-[#8e9297]" />
              <span className="text-white font-semibold">отправить-озвучку</span>
              <div className="w-px h-6 bg-[#40444b] mx-2 hidden sm:block"></div>
              <span className="text-[#8e9297] text-sm hidden sm:block">Присылай демо-запись и расскажи о себе</span>
              <div className="ml-auto flex items-center gap-2 sm:gap-4">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#b9bbbe] cursor-pointer hover:text-[#dcddde]" />
              </div>
            </div>

            {/* Сообщения чата */}
            <div className="flex-1 p-2 sm:p-4 space-y-4 sm:space-y-6 overflow-y-auto">

              {/* Приветственное сообщение */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#5865f2] rounded-full flex items-center justify-center flex-shrink-0">
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">Ruika Saki Mod Arika Aishi</span>
                    <span className="text-[#5865f2] text-xs font-semibold bg-[#5865f2]/20 px-1.5 py-0.5 rounded">Разработчик</span>
                    <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня</span>
                  </div>
                  <p className="text-[#dcddde] text-sm sm:text-base mb-3">
                    <strong>Привет! Я создаю мод и ищу голосовых актёров.</strong> Нужны живые голоса для озвучки персонажей — уникальные, настоящие, с характером.
                  </p>
                  <div className="bg-[#2f3136] border-l-4 border-[#5865f2] p-3 sm:p-4 rounded">
                    <h3 className="text-white font-semibold mb-2 text-sm sm:text-base">Что нужно от тебя:</h3>
                    <ul className="space-y-1 text-xs sm:text-sm text-[#b9bbbe]">
                      <li>🎙️ Запись голоса — аудио или видео файл</li>
                      <li>📝 Коротко о себе и своём опыте</li>
                      <li>🎭 Можешь показать разные интонации и персонажей</li>
                      <li>⚡ Отвечу каждому в течение 48 часов</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Сообщение участника 1 */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">А</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">Алексей_voice</span>
                    <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 11:42</span>
                  </div>
                  <div className="text-[#dcddde] text-sm sm:text-base mb-2">
                    Отличный проект! Уже отправил свою запись, жду ответа 🎙️
                  </div>
                  <div className="flex items-center gap-2 bg-[#2f3136] rounded px-3 py-2 w-fit">
                    <FileAudio className="w-4 h-4 text-[#5865f2]" />
                    <span className="text-[#dcddde] text-xs">demo_voice_aleksey.mp3</span>
                    <span className="text-[#72767d] text-xs">• 1.2 MB</span>
                  </div>
                </div>
              </div>

              {/* Сообщение участника 2 */}
              <div className="flex gap-2 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs sm:text-sm font-medium">К</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-white font-medium text-sm sm:text-base">Катя_актриса</span>
                    <span className="text-[#72767d] text-xs hidden sm:inline">Сегодня в 12:15</span>
                  </div>
                  <div className="text-[#dcddde] text-sm sm:text-base">
                    Есть опыт озвучки в играх, отправила видео с несколькими персонажами. Очень хочу поучаствовать! ✨
                  </div>
                </div>
              </div>

              {/* Требования к записи */}
              <div className="bg-[#2f3136] border border-[#202225] rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#faa61a]" />
                  Требования к записи
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-sm sm:text-base">1</span>
                    </div>
                    <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Формат файла</h4>
                    <p className="text-[#b9bbbe] text-xs sm:text-sm">MP3, WAV, MP4 или любой видеоформат</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-sm sm:text-base">2</span>
                    </div>
                    <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Длительность</h4>
                    <p className="text-[#b9bbbe] text-xs sm:text-sm">От 30 секунд до 3 минут демо</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#5865f2] rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="text-white font-bold text-sm sm:text-base">3</span>
                    </div>
                    <h4 className="text-white font-medium mb-2 text-sm sm:text-base">Качество</h4>
                    <p className="text-[#b9bbbe] text-xs sm:text-sm">Чистый звук без сильных шумов</p>
                  </div>
                </div>
              </div>

              {/* Форма контакта */}
              <div id="contact-form" className="bg-[#2f3136] border border-[#202225] rounded-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-[#5865f2]" />
                  Подать заявку
                </h2>
                <p className="text-[#b9bbbe] text-sm mb-5">Заполни форму и прикрепи своё демо — я свяжусь с тобой лично</p>

                {submitted ? (
                  <div className="flex flex-col items-center gap-3 py-8 text-center">
                    <CheckCircle className="w-12 h-12 text-[#3ba55c]" />
                    <h3 className="text-white text-lg font-semibold">Заявка отправлена!</h3>
                    <p className="text-[#b9bbbe] text-sm">Отвечу тебе в течение 48 часов. Спасибо!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-1.5">
                          Имя *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Как тебя зовут?"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-[#40444b] border border-[#202225] rounded px-3 py-2.5 text-white text-sm placeholder-[#72767d] focus:outline-none focus:border-[#5865f2] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-1.5">
                          Контакт *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Discord, Telegram или email"
                          value={form.contact}
                          onChange={(e) => setForm({ ...form, contact: e.target.value })}
                          className="w-full bg-[#40444b] border border-[#202225] rounded px-3 py-2.5 text-white text-sm placeholder-[#72767d] focus:outline-none focus:border-[#5865f2] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-1.5">
                        Опыт озвучки
                      </label>
                      <input
                        type="text"
                        placeholder="Опыт в играх, анимации, YouTube — напиши пару слов"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="w-full bg-[#40444b] border border-[#202225] rounded px-3 py-2.5 text-white text-sm placeholder-[#72767d] focus:outline-none focus:border-[#5865f2] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-1.5">
                        Сообщение
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Расскажи о себе, своём голосе, персонажах которых можешь сыграть..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full bg-[#40444b] border border-[#202225] rounded px-3 py-2.5 text-white text-sm placeholder-[#72767d] focus:outline-none focus:border-[#5865f2] transition-colors resize-none"
                      />
                    </div>

                    {/* Загрузка файла */}
                    <div>
                      <label className="block text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-1.5">
                        Демо-запись (аудио или видео)
                      </label>
                      <div
                        className="border-2 border-dashed border-[#40444b] hover:border-[#5865f2] rounded-lg p-4 sm:p-6 text-center cursor-pointer transition-colors group"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="audio/*,video/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        {fileName ? (
                          <div className="flex items-center justify-center gap-2 text-[#3ba55c]">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">{fileName}</span>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-[#4f545c] group-hover:text-[#5865f2] mx-auto mb-2 transition-colors" />
                            <p className="text-[#b9bbbe] text-sm">Нажми чтобы выбрать файл</p>
                            <p className="text-[#72767d] text-xs mt-1">MP3, WAV, MP4, MOV — до 100 МБ</p>
                          </>
                        )}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#5865f2] hover:bg-[#4752c4] text-white py-3 rounded text-sm font-semibold"
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      Отправить заявку
                    </Button>
                  </form>
                )}
              </div>

              {/* Преимущества */}
              <div className="bg-[#2f3136] border border-[#202225] rounded-lg p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-4">Почему стоит участвовать?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { icon: "Star", title: "Твой голос в игре", desc: "Услышат тысячи игроков по всему миру" },
                    { icon: "Shield", title: "Полное авторство", desc: "Ты указан в титрах мода" },
                    { icon: "MessageSquare", title: "Живое общение", desc: "Работаем вместе, даю обратную связь" },
                    { icon: "CheckCircle", title: "Гибкий формат", desc: "Запись дома — никуда ехать не надо" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded hover:bg-[#36393f] transition-colors"
                    >
                      <div className="text-[#5865f2] mt-0.5">
                        <Icon name={feature.icon} size={18} />
                      </div>
                      <div>
                        <div className="text-white font-medium text-xs sm:text-sm">{feature.title}</div>
                        <div className="text-[#b9bbbe] text-xs sm:text-sm">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Поле ввода снизу */}
            <div className="p-2 sm:p-4">
              <div
                className="bg-[#40444b] rounded-lg px-3 sm:px-4 py-2 sm:py-3 cursor-pointer hover:bg-[#4a4e57] transition-colors"
                onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                <div className="text-[#72767d] text-xs sm:text-sm flex items-center gap-2">
                  <Mic className="w-4 h-4" />
                  Нажми чтобы оставить заявку на озвучку...
                </div>
              </div>
            </div>
          </div>

          {/* Боковая панель участников */}
          <div className="hidden xl:block w-60 bg-[#2f3136] p-4">
            <div className="mb-4">
              <h3 className="text-[#8e9297] text-xs font-semibold uppercase tracking-wide mb-2">Подали заявку — 12</h3>
              <div className="space-y-2">
                {[
                  { name: "Алексей_voice", status: "Заявка принята ✓", avatar: "А", color: "from-purple-500 to-pink-500" },
                  { name: "Катя_актриса", status: "На рассмотрении", avatar: "К", color: "from-green-500 to-teal-500" },
                  { name: "Sergey_deep", status: "Заявка принята ✓", avatar: "С", color: "from-blue-500 to-indigo-500" },
                ].map((user, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 rounded hover:bg-[#36393f] cursor-pointer">
                    <div className={`w-8 h-8 bg-gradient-to-r ${user.color} rounded-full flex items-center justify-center relative`}>
                      <span className="text-white text-sm font-medium">{user.avatar}</span>
                      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#3ba55c] border-2 border-[#2f3136] rounded-full"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{user.name}</div>
                      <div className="text-[#b9bbbe] text-xs truncate">{user.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;