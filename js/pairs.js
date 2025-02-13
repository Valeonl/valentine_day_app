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
    { id: 7, emoji: '📚', label: 'Знания', category: 'education',  },
    { id: 8, emoji: '🎓', label: 'Успех', category: 'education',  },
    { id: 9, emoji: '🌹', label: 'Красота', category: 'nature',  },
    { id: 10, emoji: '🦋', label: 'Нежность', category: 'nature',  },
    { id: 11, emoji: '⭐', label: 'Мечта', category: 'dreams',  },
    { id: 12, emoji: '🌈', label: 'Надежда', category: 'dreams',  },
    { id: 13, emoji: '💝', label: 'Любовь', category: 'feelings',  },
    { id: 14, emoji: '💫', label: 'Счастье', category: 'feelings',  },
    { id: 15, emoji: '🎨', label: 'Творчество', category: 'art',  },
    { id: 16, emoji: '🖼️', label: 'Искусство', category: 'art',  },
    { id: 17, emoji: '🌺', label: 'Весна', category: 'seasons',  },
    { id: 18, emoji: '🌸', label: 'Цветение', category: 'seasons',  },
    { id: 19, emoji: '🎭', label: 'Театр', category: 'culture',  },
    { id: 20, emoji: '🎪', label: 'Цирк', category: 'culture',  },
    { id: 21, emoji: '📖', label: 'Книга', category: 'hobby',  },
    { id: 22, emoji: '✒️', label: 'Письмо', category: 'hobby',  },
    { id: 23, emoji: '🎪', label: 'Праздник', category: 'event',  },
    { id: 24, emoji: '🎉', label: 'Веселье', category: 'event',  },
    { id: 25, emoji: '🌟', label: 'Успех', category: 'achievement',  },
    { id: 26, emoji: '🏆', label: 'Победа', category: 'achievement',  },
    { id: 27, emoji: '🎸', label: 'Гитара', category: 'instruments',  },
    { id: 28, emoji: '🎻', label: 'Скрипка', category: 'instruments',  },
    { id: 29, emoji: '🍫', label: 'Сладость', category: 'treats',  },
    { id: 30, emoji: '🍬', label: 'Конфета', category: 'treats',  }
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