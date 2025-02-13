const REQUIRED_PAIR = [
    { id: 'cad1', emoji: '<img src="css/pics/logo.svg" style="width: 40px; height: 40px;">', label: '«ЦАД»', category: 'workplace', fontSize: '1.2rem'  },
    { id: 'cad2', emoji: '❤️', label: 'Любимая<br>работа', category: 'workplace', }
];

const ALL_PAIRS = [
    { id: 1, emoji: '👨', label: 'Он', category: 'couple',  },
    { id: 2, emoji: '👩', label: 'Она', category: 'couple',  },
    { id: 3, emoji: '🌞', label: 'День', category: 'time',  },
    { id: 4, emoji: '🌙', label: 'Ночь', category: 'time',  },
    { id: 5, emoji: '🎵', label: 'Мелодия', category: 'music',  },
    { id: 6, emoji: '🎹', label: 'Музыка', category: 'music',  },
    { id: 7, emoji: '☕', label: 'Кофе', category: 'drinks',  },
    { id: 8, emoji: '🥛', label: 'Молоко', category: 'drinks',  },
    { id: 9, emoji: '🐱', label: 'Кошка', category: 'pets',  },
    { id: 10, emoji: '🐶', label: 'Собака', category: 'pets',  },
    { id: 11, emoji: '🌸', label: 'Цветок', category: 'garden',  },
    { id: 12, emoji: '🦋', label: 'Бабочка', category: 'garden',  },
    { id: 13, emoji: '📚', label: 'Книга', category: 'reading',  },
    { id: 14, emoji: '🤓', label: 'Читатель', category: 'reading',  },
    { id: 15, emoji: '⭐', label: 'Звезда', category: 'space',  },
    { id: 16, emoji: '🌙', label: 'Луна', category: 'space',  },
    { id: 17, emoji: '🎨', label: 'Краски', category: 'art',  },
    { id: 18, emoji: '🖼️', label: 'Картина', category: 'art',  },
    { id: 19, emoji: '🎭', label: 'Маска', category: 'theater',  },
    { id: 20, emoji: '🎬', label: 'Сцена', category: 'theater',  },
    { id: 21, emoji: '🌊', label: 'Волна', category: 'sea',  },
    { id: 22, emoji: '🏖️', label: 'Пляж', category: 'sea',  },
    { id: 23, emoji: '🎮', label: 'Игра', category: 'gaming',  },
    { id: 24, emoji: '🕹️', label: 'Джойстик', category: 'gaming',  },
    { id: 25, emoji: '🍕', label: 'Пицца', category: 'food',  },
    { id: 26, emoji: '🧀', label: 'Сыр', category: 'food',  },
    { id: 27, emoji: '✈️', label: 'Самолёт', category: 'travel',  },
    { id: 28, emoji: '🌍', label: 'Мир', category: 'travel',  },
    { id: 29, emoji: '🎸', label: 'Гитара', category: 'band',  },
    { id: 30, emoji: '🥁', label: 'Барабаны', category: 'band',  },
    { id: 31, emoji: '🌈', label: 'Радуга', category: 'weather',  },
    { id: 32, emoji: '☔', label: 'Дождь', category: 'weather',  },
    { id: 33, emoji: '🎪', label: 'Цирк', category: 'show',  },
    { id: 34, emoji: '🤹', label: 'Жонглёр', category: 'show',  },
    { id: 35, emoji: '🎨', label: 'Палитра', category: 'painting',  },
    { id: 36, emoji: '🖌️', label: 'Кисть', category: 'painting',  },
    { id: 37, emoji: '🌺', label: 'Роза', category: 'flowers',  },
    { id: 38, emoji: '🌷', label: 'Тюльпан', category: 'flowers',  },
    { id: 39, emoji: '🎭', label: 'Комедия', category: 'genres',  },
    { id: 40, emoji: '🎬', label: 'Драма', category: 'genres',  },
    { id: 41, emoji: '🏰', label: 'Замок', category: 'circus',  },
    { id: 42, emoji: '👑', label: 'Король', category: 'circus',  },
    { id: 43, emoji: '🎻', label: 'Скрипка', category: 'orchestra',  },
    { id: 44, emoji: '🎺', label: 'Труба', category: 'orchestra',  },
    { id: 45, emoji: '🌅', label: 'Рассвет', category: 'daylight',  },
    { id: 46, emoji: '🌄', label: 'Закат', category: 'daylight',  }
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