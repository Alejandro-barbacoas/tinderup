export interface Profile {
    id: number;
    name: string;
    age: number;
    bio: string;
    image: string;
    interests: string[];
  }
  
  export const profiles: Profile[] = [
    {
      id: 1,
      name: "Ana",
      age: 22,
      bio: "Me encanta viajar y la fotografía 📸",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      interests: ["Viajar", "Fotografía", "Café"]
    },
    {
      id: 2,
      name: "Carlos",
      age: 24,
      bio: "Gamer profesional 🎮 | Streamer",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      interests: ["Gaming", "Tecnología", "Música"]
    },
    {
      id: 3,
      name: "María",
      age: 23,
      bio: "Amante de los animales y la naturaleza 🌿",
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      interests: ["Animales", "Senderismo", "Yoga"]
    },
    {
      id: 4,
      name: "Diego",
      age: 25,
      bio: "Chef en formación 👨‍🍳 | Foodie",
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      interests: ["Cocina", "Comida", "Vino"]
    },
    {
      id: 5,
      name: "Laura",
      age: 21,
      bio: "Estudiante de arte 🎨 | Pintora",
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      interests: ["Arte", "Pintura", "Museos"]
    },
    {
      id: 6,
      name: "Miguel",
      age: 26,
      bio: "Fitness enthusiast 💪 | Personal trainer",
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      interests: ["Gym", "Deportes", "Nutrición"]
    },
    {
      id: 7,
      name: "Sofia",
      age: 24,
      bio: "Bailarina profesional 💃 | Amo el reggaeton",
      image: "https://randomuser.me/api/portraits/women/7.jpg",
      interests: ["Baile", "Música", "Fiesta"]
    },
    {
      id: 8,
      name: "Andrés",
      age: 27,
      bio: "Ingeniero de día, músico de noche 🎸",
      image: "https://randomuser.me/api/portraits/men/8.jpg",
      interests: ["Música", "Rock", "Conciertos"]
    }
  ];