// ============================================
// BOOKS DATABASE - Tamil + English Mix
// ============================================
const booksData = [
    // TAMIL BOOKS
    {
        id: 1,
        title: "பொன்னியின் செல்வன் (Ponniyin Selvan)",
        author: "Kalki Krishnamurthy",
        genre: "historical",
        length: "long",
        pages: 2400,
        image: "images/books/book1.jpg",
        synopsis: "An epic historical novel set in 10th century Tamil Nadu during the Chola dynasty. The story follows the adventures of Vandiyathevan and Arulmozhi Varman (who becomes Raja Raja Chola I).",
        rating: 4.8,
        reviews: [
            { reviewer: "Tamil Literature Society", rating: 5, comment: "The greatest Tamil novel ever written" },
            { reviewer: "Readers Choice", rating: 4.5, comment: "A masterpiece of historical fiction" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 2,
        title: "சிவகாமியின் சபதம் (Sivagamiyin Sabadham)",
        author: "Kalki Krishnamurthy",
        genre: "historical",
        length: "long",
        pages: 1200,
        image: "images/books/book2.jpg",
        synopsis: "Set during the Pallava period, this novel tells the story of Sivagami, a talented dancer, and the construction of the shore temple at Mahabalipuram.",
        rating: 4.7,
        reviews: [
            { reviewer: "Historical Fiction", rating: 5, comment: "Brings Pallava era to life" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 3,
        title: "மதுரபாகன் (One Part Woman)",
        author: "Perumal Murugan",
        genre: "fiction",
        length: "medium",
        pages: 320,
        image: "images/books/book3.jpg",
        synopsis: "A powerful novel about a childless couple facing societal pressure in rural Tamil Nadu during the annual temple festival.",
        rating: 4.6,
        reviews: [
            { reviewer: "Modern Tamil Literature", rating: 5, comment: "Bold and thought-provoking" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 4,
        title: "வெக்கை (Pyre)",
        author: "Perumal Murugan",
        genre: "fiction",
        length: "medium",
        pages: 280,
        image: "images/books/book4.jpg",
        synopsis: "A searing narrative about caste discrimination in rural Tamil Nadu and a young boy's struggle for education.",
        rating: 4.5,
        reviews: [
            { reviewer: "Social Justice Review", rating: 5, comment: "Important reading" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 5,
        title: "சில நேரங்களில் சில மனிதர்கள்",
        author: "Jayakanthan",
        genre: "fiction",
        length: "short",
        pages: 180,
        image: "images/books/book5.jpg",
        synopsis: "A psychological exploration of human nature, examining morality and relationships in Jayakanthan's introspective style.",
        rating: 4.5,
        reviews: [
            { reviewer: "Tamil Critics", rating: 5, comment: "A psychological masterpiece" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 6,
        title: "என் இனிய இயந்திர (En Iniya Iyanthira)",
        author: "Sujatha",
        genre: "sci-fi",
        length: "medium",
        pages: 250,
        image: "images/books/book6.jpg",
        synopsis: "Groundbreaking Tamil science fiction involving AI and robotics, blending Tamil storytelling with futuristic concepts.",
        rating: 4.4,
        reviews: [
            { reviewer: "Sci-Fi Readers", rating: 4.5, comment: "Pioneering Tamil sci-fi" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 7,
        title: "கடல் புறா (Kadal Pura)",
        author: "Sandilyan",
        genre: "historical",
        length: "long",
        pages: 800,
        image: "images/books/book7.jpg",
        synopsis: "Historical adventure featuring naval expeditions and the glory of Chola maritime supremacy.",
        rating: 4.5,
        reviews: [
            { reviewer: "Adventure", rating: 4.7, comment: "Epic maritime adventure" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 8,
        title: "காற்றுகள்",
        author: "Sivasankari",
        genre: "fiction",
        length: "medium",
        pages: 280,
        image: "images/books/book1.jpg",
        synopsis: "Explores lives of women in traditional Tamil families and the winds of social change.",
        rating: 4.3,
        reviews: [
            { reviewer: "Women's Literature", rating: 4.5, comment: "Powerful female characters" }
        ],
        sequels: [],
        prequels: []
    },

    // ENGLISH BOOKS
    {
        id: 9,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "fiction",
        length: "short",
        pages: 180,
        image: "images/books/book9.jpg",
        synopsis: "A story of decadence and excess in 1920s America, exploring the American Dream through Jay Gatsby.",
        rating: 4.4,
        reviews: [
            { reviewer: "Classic Literature", rating: 4.5, comment: "The Great American Novel" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 10,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "fiction",
        length: "medium",
        pages: 324,
        image: "images/books/book10.jpg",
        synopsis: "A classic about racial injustice and childhood innocence in 1930s American South.",
        rating: 4.8,
        reviews: [
            { reviewer: "Literary Classics", rating: 5, comment: "Essential American literature" }
        ],
        sequels: ["Go Set a Watchman"],
        prequels: []
    },
    {
        id: 11,
        title: "1984",
        author: "George Orwell",
        genre: "dystopian",
        length: "medium",
        pages: 328,
        image: "images/books/book11.jpg",
        synopsis: "Dystopian novel about totalitarianism, surveillance, and manipulation of truth under Big Brother.",
        rating: 4.7,
        reviews: [
            { reviewer: "Dystopian Fiction", rating: 5, comment: "Chillingly prophetic" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 12,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        genre: "romance",
        length: "medium",
        pages: 432,
        image: "images/books/book12.jpg",
        synopsis: "Romantic novel following Elizabeth Bennet navigating morality, education, and marriage in Georgian England.",
        rating: 4.6,
        reviews: [
            { reviewer: "Romance Readers", rating: 4.8, comment: "Witty and timeless" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 13,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "fantasy",
        length: "medium",
        pages: 310,
        image: "images/books/book13.jpg",
        synopsis: "Bilbo Baggins's unexpected journey with dwarves to reclaim their home from dragon Smaug.",
        rating: 4.7,
        reviews: [
            { reviewer: "Fantasy Lovers", rating: 5, comment: "Perfect fantasy adventure" }
        ],
        sequels: ["The Fellowship of the Ring", "The Two Towers", "The Return of the King"],
        prequels: []
    },
    {
        id: 14,
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        genre: "fantasy",
        length: "medium",
        pages: 309,
        image: "images/books/book14.jpg",
        synopsis: "A young wizard's first year at Hogwarts, discovering friendship, magic, and his destiny.",
        rating: 4.8,
        reviews: [
            { reviewer: "YA Fiction", rating: 5, comment: "Magical and captivating" }
        ],
        sequels: ["Chamber of Secrets", "Prisoner of Azkaban", "Goblet of Fire"],
        prequels: []
    },
    {
        id: 15,
        title: "The Alchemist",
        author: "Paulo Coelho",
        genre: "fiction",
        length: "short",
        pages: 208,
        image: "images/books/book15.jpg",
        synopsis: "A shepherd's philosophical journey to Egypt in search of treasure and his personal legend.",
        rating: 4.3,
        reviews: [
            { reviewer: "Philosophical Fiction", rating: 4.5, comment: "Inspiring and profound" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 16,
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        genre: "fiction",
        length: "medium",
        pages: 371,
        image: "images/books/book16.jpg",
        synopsis: "Story of friendship and redemption set against Afghanistan's tumultuous history.",
        rating: 4.6,
        reviews: [
            { reviewer: "Contemporary Fiction", rating: 4.8, comment: "Heartbreaking and powerful" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 17,
        title: "Life of Pi",
        author: "Yann Martel",
        genre: "adventure",
        length: "medium",
        pages: 319,
        image: "images/books/book17.jpg",
        synopsis: "A boy survives 227 days shipwrecked with a Bengal tiger named Richard Parker.",
        rating: 4.4,
        reviews: [
            { reviewer: "Adventure Fiction", rating: 4.6, comment: "Extraordinary survival story" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 18,
        title: "Brave New World",
        author: "Aldous Huxley",
        genre: "dystopian",
        length: "medium",
        pages: 288,
        image: "images/books/book18.jpg",
        synopsis: "Dystopian future where citizens are genetically modified and conditioned from birth.",
        rating: 4.5,
        reviews: [
            { reviewer: "Dystopian Classics", rating: 4.6, comment: "Visionary and disturbing" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 19,
        title: "The God of Small Things",
        author: "Arundhati Roy",
        genre: "fiction",
        length: "medium",
        pages: 340,
        image: "images/books/book19.jpg",
        synopsis: "Fraternal twins in Kerala whose lives are destroyed by social taboos and forbidden love.",
        rating: 4.5,
        reviews: [
            { reviewer: "Indian Literature", rating: 4.7, comment: "Lyrical and heartbreaking" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 20,
        title: "One Hundred Years of Solitude",
        author: "Gabriel García Márquez",
        genre: "magical-realism",
        length: "long",
        pages: 417,
        image: "images/books/book20.jpg",
        synopsis: "Seven generations of the Buendía family in the magical town of Macondo.",
        rating: 4.7,
        reviews: [
            { reviewer: "World Literature", rating: 5, comment: "A literary masterpiece" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 21,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "fiction",
        length: "short",
        pages: 234,
        image: "images/books/book21.jpg",
        synopsis: "Teenage rebellion and alienation through Holden Caulfield's New York City experiences.",
        rating: 4.0,
        reviews: [
            { reviewer: "Coming of Age", rating: 4.2, comment: "Authentic teenage voice" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 22,
        title: "The Lord of the Rings: Fellowship",
        author: "J.R.R. Tolkien",
        genre: "fantasy",
        length: "long",
        pages: 423,
        image: "images/books/book22.jpg",
        synopsis: "Frodo and the Fellowship begin their quest to destroy the One Ring.",
        rating: 4.9,
        reviews: [
            { reviewer: "Fantasy Epic", rating: 5, comment: "Ultimate fantasy adventure" }
        ],
        sequels: ["The Two Towers", "The Return of the King"],
        prequels: ["The Hobbit"]
    },
    {
        id: 23,
        title: "Midnight's Children",
        author: "Salman Rushdie",
        genre: "magical-realism",
        length: "long",
        pages: 536,
        image: "images/books/book23.jpg",
        synopsis: "India's transition from colonialism through Saleem Sinai, born at midnight on independence.",
        rating: 4.4,
        reviews: [
            { reviewer: "Indian Literature", rating: 4.6, comment: "Ambitious and brilliant" }
        ],
        sequels: [],
        prequels: []
    },
    {
        id: 24,
        title: "Animal Farm",
        author: "George Orwell",
        genre: "dystopian",
        length: "short",
        pages: 112,
        image: "images/books/book24.jpg",
        synopsis: "Allegorical novella about farm animals overthrowing humans, reflecting Soviet totalitarianism.",
        rating: 4.6,
        reviews: [
            { reviewer: "Political Fiction", rating: 4.8, comment: "Powerful allegory" }
        ],
        sequels: ["1984"],
        prequels: []
    },
    {
        id: 25,
        title: "The Chronicles of Narnia",
        author: "C.S. Lewis",
        genre: "fantasy",
        length: "short",
        pages: 206,
        image: "images/books/book25.jpg",
        synopsis: "Four siblings discover the magical land of Narnia through a wardrobe.",
        rating: 4.5,
        reviews: [
            { reviewer: "Children's Fantasy", rating: 4.7, comment: "Timeless magical adventure" }
        ],
        sequels: ["Prince Caspian", "The Voyage of the Dawn Treader"],
        prequels: []
    }
];

// ============================================
// AUTHORS DATABASE
// ============================================
const authors = [
    {
        name: "Kalki Krishnamurthy",
        bio: "Renowned Tamil writer and freedom fighter, best known for historical novels Ponniyin Selvan and Sivagamiyin Sabadham.",
        image: "images/authors/kalki.jpg"
    },
    {
        name: "Jayakanthan",
        bio: "Jnanpith Award-winning Tamil writer exploring human psychology and social issues.",
        image: "images/authors/jayakanthan.jpg"
    },
    {
        name: "Sujatha",
        bio: "Prolific Tamil author who wrote over 100 novels, bridging Tamil literature with technology.",
        image: "images/authors/sujatha.jpg"
    },
    {
        name: "Perumal Murugan",
        bio: "Contemporary Tamil writer known for powerful novels exploring rural Tamil Nadu life.",
        image: "images/authors/perumal-murugan.jpg"
    },
    {
        name: "Sivasankari",
        bio: "Acclaimed Tamil novelist and Padma Shri awardee known for strong female characters.",
        image: "images/authors/sivasankari.jpg"
    },
    {
        name: "Jane Austen",
        bio: "English novelist known for Pride and Prejudice and other classics critiquing British society.",
        image: "images/authors/jane-austen.jpg"
    },
    {
        name: "J.K. Rowling",
        bio: "British author of the Harry Potter series, the best-selling book series in history.",
        image: "images/authors/jk-rowling.jpg"
    },
    {
        name: "Stephen King",
        bio: "American author of horror and suspense with over 350 million books sold worldwide.",
        image: "images/authors/stephen-king.jpg"
    },
    {
        name: "George Orwell",
        bio: "English novelist famous for Nineteen Eighty-Four and Animal Farm.",
        image: "images/authors/george-orwell.jpg"
    },
    {
        name: "J.R.R. Tolkien",
        bio: "English writer and creator of Middle-earth, author of The Hobbit and The Lord of the Rings.",
        image: "images/authors/tolkien.jpg"
    }
];