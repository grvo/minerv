// imports locais
import {
    initEmojiMap,
    EMOJI_VERSION
} from '~/emoji';

import {
    CACHE_VERSION_KEY,
    CACHE_KEY
} from '~/emoji/constants';

// exports
export const validEmoji = {
    atom: {
        moji: '⚛',
        description: 'símbolo de atom',
        unicodeVersion: '4.1',
        aliases: ['atom_symbol']
    },

    bomb: {
        moji: '💣',
        unicodeVersion: '6.0',
        description: 'bomba'
    },

    construction_worker_tone5: {
        moji: '👷🏿',
        unicodeVersion: '8.0',
        description: 'trabalhador da construção civil tom 5'
    },

    five: {
        moji: '5️⃣',
        unicodeVersion: '3.0',
        description: 'tecla digito cinco'
    },

    grey_question: {
        moji: '❔',
        unicodeVersion: '6.0',
        description: 'ornamento de ponto de interrogação branco'
    },

    black_heart: {
        moji: '🖤',
        unicodeVersion: '1.1',
        description: 'coração preto'
    },

    heart: {
        moji: '❤',
        unicodeVersion: '1.1',
        description: 'coração negro pesado'
    },

    custard: {
        moji: '🍮',
        unicodeVersion: '6.0',
        description: 'quindim'
    },

    star: {
        moji: '⭐',
        unicodeVersion: '5.1',
        description: 'estrela média branca'
    },

    gay_pride_flag: {
        moji: '🏳️‍🌈',
        unicodeVersion: '7.0',
        description: 'porque contém um joiner de largura zero'
    },

    family_mmb: {
        moji: '👨‍👨‍👦',
        unicodeVersion: '6.0',
        description: 'porque contém vários joiners de largura zero'
    },

    thumbsup: {
        moji: '👍',
        unicodeVersion: '6.0',
        description: 'sinal de polegar para cima'
    },

    thumbsdown: {
        moji: '👎',
        description: 'sinal de polegar para baixo',
        unicodeVersion: '6.0'
    }
};

export const emojiFixtureMap = {
    ...validEmoji,
    ...invalidEmoji
};

export const mockEmojiData = Object.keys(emojiFixtureMap).reduce((acc, k) => {
    const {
        moji: e,
        unicodeVersion: u,
        category: c,
        description: d
    } = emojiFixtureMap[k];

    acc[k] = {
        name: k, e, u, c, d
    };

    return acc;
}, {});

export function clearEmojiMock() {
    localStorage.clear();

    initEmojiMap.promise = null;
}

export async function initEmojiMock(mockData = mockEmojiData) {
    clearEmojiMock();

    localStorage.setItem(CACHE_VERSION_KEY, EMOJI_VERSION);
    localStorage.setItem(CACHE_KEY, JSON.stringify(mockData));

    await initEmojiMap();
}