const REQUIRED_PAIR = [
    { id: 'cad1', emoji: '<img src="css/pics/logo.svg" style="width: 40px; height: 40px;">', label: '«ЦАД»', category: 'workplace', fontSize: '1.2rem'  },
    { id: 'cad2', emoji: '❤️', label: 'Любимая<br>работа', category: 'workplace', }
];

const ALL_PAIRS = [
    { id: 1, emoji: '👨', label: 'Он', category: 'couple' },
    { id: 2, emoji: '👩', label: 'Она', category: 'couple' },
    { id: 3, emoji: '🌞', label: 'День', category: 'time' },
    { id: 4, emoji: '🌜', label: 'Ночь', category: 'time' },
    { id: 5, emoji: '🎵', label: 'Мелодия', category: 'music' },
    { id: 6, emoji: '🎹', label: 'Музыка', category: 'music' },
    { id: 7, emoji: '☕', label: 'Кофе', category: 'drinks' },
    { id: 8, emoji: '🥛', label: 'Молоко', category: 'drinks' },
    { id: 9, emoji: '🐱', label: 'Кошка', category: 'pets' },
    { id: 10, emoji: '🐶', label: 'Собака', category: 'pets' },
    { id: 11, emoji: '🌸', label: 'Цветок', category: 'garden' },
    { id: 12, emoji: '🦋', label: 'Бабочка', category: 'garden' },
    { id: 13, emoji: '📚', label: 'Книга', category: 'reading' },
    { id: 14, emoji: '👓', label: 'Читатель', category: 'reading' },
    { id: 15, emoji: '⭐', label: 'Звезда', category: 'space' },
    { id: 16, emoji: '🌑', label: 'Луна', category: 'space' },
    { id: 17, emoji: '🎨', label: 'Краски', category: 'art' },
    { id: 18, emoji: '🖼️', label: 'Картина', category: 'art' },
    { id: 19, emoji: '🎭', label: 'Маска', category: 'theater' },
    { id: 20, emoji: '🎪', label: 'Сцена', category: 'theater' },
    { id: 21, emoji: '🌊', label: 'Волна', category: 'sea' },
    { id: 22, emoji: '🏖️', label: 'Пляж', category: 'sea' },
    { id: 23, emoji: '🎮', label: 'Игра', category: 'gaming' },
    { id: 24, emoji: '🕹️', label: 'Джойстик', category: 'gaming' },
    { id: 25, emoji: '🍕', label: 'Пицца', category: 'food' },
    { id: 26, emoji: '🧀', label: 'Сыр', category: 'food' },
    { id: 27, emoji: '✈️', label: 'Самолёт', category: 'travel' },
    { id: 28, emoji: '🌍', label: 'Мир', category: 'travel' },
    { id: 29, emoji: '🎸', label: 'Гитара', category: 'band' },
    { id: 30, emoji: '🥁', label: 'Барабаны', category: 'band' },
    { id: 31, emoji: '🌈', label: 'Радуга', category: 'weather' },
    { id: 32, emoji: '☔', label: 'Дождь', category: 'weather' },
    { id: 33, emoji: '🎠', label: 'Цирк', category: 'show' },
    { id: 34, emoji: '🤹', label: 'Жонглёр', category: 'show' },
    { id: 35, emoji: '🖌️', label: 'Палитра', category: 'painting' },
    { id: 36, emoji: '✏️', label: 'Кисть', category: 'painting' },
    { id: 37, emoji: '🌺', label: 'Роза', category: 'flowers' },
    { id: 38, emoji: '🌷', label: 'Тюльпан', category: 'flowers' },
    { id: 39, emoji: '😂', label: 'Комедия', category: 'genres' },
    { id: 40, emoji: '😢', label: 'Драма', category: 'genres' },
    { id: 41, emoji: '🏰', label: 'Замок', category: 'castle' },
    { id: 42, emoji: '👑', label: 'Король', category: 'castle' },
    { id: 43, emoji: '🎻', label: 'Скрипка', category: 'orchestra' },
    { id: 44, emoji: '🎺', label: 'Труба', category: 'orchestra' },
    { id: 45, emoji: '🌅', label: 'Рассвет', category: 'daylight' },
    { id: 46, emoji: '🌄', label: 'Закат', category: 'daylight' },
    { id: 47, emoji: '🎲', label: 'Кубик', category: 'boardgames' },
    { id: 48, emoji: '♟️', label: 'Шахматы', category: 'boardgames' },
    { id: 49, emoji: '🍦', label: 'Мороженое', category: 'desserts' },
    { id: 50, emoji: '🧁', label: 'Кекс', category: 'desserts' },
    { id: 51, emoji: '⛺', label: 'Шатёр', category: 'festival' },
    { id: 52, emoji: '🎡', label: 'Карусель', category: 'festival' },
    { id: 53, emoji: '📷', label: 'Фотограф', category: 'hobby' },
    { id: 54, emoji: '🎞️', label: 'Альбом', category: 'hobby' },
    { id: 55, emoji: '🌿', label: 'Листок', category: 'nature' },
    { id: 56, emoji: '🍃', label: 'Ветер', category: 'nature' },
    { id: 57, emoji: '🎯', label: 'Дартс', category: 'sport' },
    { id: 58, emoji: '🎳', label: 'Боулинг', category: 'sport' },
    { id: 59, emoji: '🌳', label: 'Дерево', category: 'forest' },
    { id: 60, emoji: '🦊', label: 'Лиса', category: 'forest' },
    { id: 61, emoji: '🎟️', label: 'Билет', category: 'performance' },
    { id: 62, emoji: '👥', label: 'Зрители', category: 'performance' },
    { id: 63, emoji: '🎢', label: 'Горка', category: 'leisure' },
    { id: 64, emoji: '🎰', label: 'Автомат', category: 'leisure' },
    { id: 65, emoji: '🧩', label: 'Пазл', category: 'puzzle' },
    { id: 66, emoji: '🔍', label: 'Загадка', category: 'puzzle' },
    { id: 67, emoji: '🎼', label: 'Ноты', category: 'sheet_music' },
    { id: 68, emoji: '📝', label: 'Запись', category: 'sheet_music' },
    { id: 69, emoji: '🦜', label: 'Попугай', category: 'birds' },
    { id: 70, emoji: '🕊️', label: 'Голубь', category: 'birds' },
    { id: 71, emoji: '🎆', label: 'Салют', category: 'celebration' },
    { id: 72, emoji: '🎉', label: 'Праздник', category: 'celebration' },
    { id: 73, emoji: '⛵', label: 'Парус', category: 'vacation' },
    { id: 74, emoji: '🏊', label: 'Пляж', category: 'vacation' },
    { id: 75, emoji: '🍿', label: 'Попкорн', category: 'cinema' },
    { id: 76, emoji: '🎬', label: 'Фильм', category: 'cinema' },
    { id: 77, emoji: '🎱', label: 'Бильярд', category: 'games' },
    { id: 78, emoji: '🎯', label: 'Мишень', category: 'games' },
    { id: 79, emoji: '🍬', label: 'Скитлс', category: 'safari' },
    { id: 80, emoji: '🦒', label: 'Жираф', category: 'safari' },
    { id: 81, emoji: '⚽', label: 'Футбол', category: 'ball' },
    { id: 82, emoji: '🏀', label: 'Баскет', category: 'ball' },
    { id: 83, emoji: '🎣', label: 'Рыбак', category: 'fishing' },
    { id: 84, emoji: '🐟', label: 'Рыба', category: 'fishing' },
    { id: 85, emoji: '🌵', label: 'Кактус', category: 'plants' },
    { id: 86, emoji: '🎋', label: 'Бамбук', category: 'plants' },
    { id: 87, emoji: '🎪', label: 'Арена', category: 'circus' },
    { id: 88, emoji: '🦮', label: 'Тигр', category: 'circus' },
    { id: 89, emoji: '🎸', label: 'Рок', category: 'music2' },
    { id: 90, emoji: '🎧', label: 'Диджей', category: 'music2' },
    { id: 91, emoji: '🧲', label: 'Магнит', category: 'science' },
    { id: 92, emoji: '⚡', label: 'Ток', category: 'science' },
    { id: 93, emoji: '🎪', label: 'Купол', category: 'tent' },
    { id: 94, emoji: '🏕️', label: 'Лагерь', category: 'tent' },
    { id: 95, emoji: '🦅', label: 'Орёл', category: 'sky' },
    { id: 96, emoji: '☁️', label: 'Облако', category: 'sky' },
    { id: 97, emoji: '🎭', label: 'Театр', category: 'stage' },
    { id: 98, emoji: '🎪', label: 'Балет', category: 'stage' },
    { id: 99, emoji: '🌋', label: 'Вулкан', category: 'earth' },
    { id: 100, emoji: '🏔️', label: 'Гора', category: 'earth' }
];

// Функция для получения случайных 8 пар
function getRandomPairs() {
    // Получаем случайные 7 уникальных категорий (на одну меньше, чтобы добавить обязательную пару)
    const categories = [...new Set(ALL_PAIRS.map(pair => pair.category))];
    const shuffledCategories = categories
        .filter(category => category !== 'workplace') // Исключаем категорию workplace
        .sort(() => Math.random() - 0.5)
        .slice(0, 7);
    
    // Собираем все пары для выбранных категорий
    const selectedPairs = [];
    shuffledCategories.forEach(category => {
        const pairsInCategory = ALL_PAIRS.filter(pair => pair.category === category);
        selectedPairs.push(...pairsInCategory);
    });
    
    // Добавляем обязательную пару
    selectedPairs.push(...REQUIRED_PAIR);
    
    // Перемешиваем карточки
    return selectedPairs.sort(() => Math.random() - 0.5);
} 