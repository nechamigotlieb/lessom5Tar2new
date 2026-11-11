export const books = [
    {
        code: 1,
        name: "תכנות מונחה עצמים",
        category: "מדעי המחשב",
        price: 120,
        isBorrowed: false,
        borrowHistory: []
    },
    {
        code: 2,
        name: "מבוא למסדי נתונים",
        category: "מדעי המחשב",
        price: 95,
        isBorrowed: true,
        borrowHistory: [
            { borrowDate: "2026-11-01", userId: 205 }
        ]
    },
    {
        code: 3,
        name: "אלגוריתמים ומבני נתונים",
        category: "מדעי המחשב",
        price: 150,
        isBorrowed: false,
        borrowHistory: []
    }
];