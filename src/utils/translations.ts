export interface Translation {
  // Game UI
  welcome: {
    title: string;
    subtitle: string;
    features: string[];
    startButton: string;
    footer: string;
  };
  
  // Navigation
  nav: {
    hero: string;
    research: string;
    shop: string;
    inventory: string;
    mining: string;
    menu: string;
    back: string;
  };
  
  // Combat
  combat: {
    zone: string;
    streak: string;
    streakBonus: string;
    correctAnswers: string;
    timeLeft: string;
    revivalAvailable: string;
    revivalReady: string;
    correct: string;
    wrong: string;
    dealDamage: string;
    answerCorrectly: string;
    secondsToAnswer: string;
    freeRevival: string;
  };
  
  // Stats
  stats: {
    heroStatus: string;
    characterLevel: string;
    health: string;
    attack: string;
    defense: string;
    currentZone: string;
    coins: string;
    gems: string;
    shiny: string;
    startAdventure: string;
    defeated: string;
    noLives: string;
    changeMode: string;
    getBetter: string;
    premiumUnlocked: string;
    premiumMember: string;
    premiumDescription: string;
  };
  
  // Garden
  garden: {
    title: string;
    subtitle: string;
    plantSeed: string;
    howItWorks: string;
    features: string[];
    yourCoins: string;
    notEnough: string;
    growthStage: string;
    statBonus: string;
    water: string;
    remaining: string;
    growthProgress: string;
    waterLow: string;
    waterLowDesc: string;
    buyWater: string;
    cost: string;
    buyWaterButton: string;
    tip: string;
    description: string;
  };
  
  // Settings
  settings: {
    title: string;
    subtitle: string;
    visual: string;
    colorblind: string;
    colorblindDesc: string;
    darkMode: string;
    darkModeDesc: string;
    language: string;
    notifications: string;
    notificationsDesc: string;
    languageNote: string;
    autoSaved: string;
  };
  
  // Common
  common: {
    close: string;
    cancel: string;
    confirm: string;
    save: string;
    loading: string;
    error: string;
    success: string;
    level: string;
    experience: string;
    skillPoints: string;
    accuracy: string;
    total: string;
    progress: string;
    unlocked: string;
    locked: string;
    claimed: string;
    available: string;
    max: string;
    upgrade: string;
    sell: string;
    equip: string;
    equipped: string;
  };
}

export const translations: Record<string, Translation> = {
  en: {
    welcome: {
      title: "🏰 Welcome to Hugoland! 🗡️",
      subtitle: "The ultimate fantasy adventure game where knowledge is your greatest weapon!",
      features: [
        "Answer trivia questions to defeat enemies",
        "Collect powerful weapons and armor",
        "Mine gems and find rare shiny gems",
        "Unlock achievements and build knowledge streaks",
        "Explore multiple game modes and challenges",
        "Progress through infinite zones of adventure",
        "Discover ancient relics in the Yojef Market",
        "Level up and unlock powerful skills",
        "Earn daily rewards and offline progress",
        "Grow plants in the Garden of Growth"
      ],
      startButton: "Start Your Adventure",
      footer: "Begin your journey in the magical world of Hugoland"
    },
    nav: {
      hero: "Hero",
      research: "Research",
      shop: "Shop",
      inventory: "Inventory",
      mining: "Mining",
      menu: "Menu",
      back: "Back to Game"
    },
    combat: {
      zone: "Zone",
      streak: "Knowledge Streak!",
      streakBonus: "reward bonus",
      correctAnswers: "correct answers in a row",
      timeLeft: "s",
      revivalAvailable: "Revival Available",
      revivalReady: "💖 Revival Ready",
      correct: "🎉 Correct! You deal damage!",
      wrong: "❌ Wrong! The enemy attacks you!",
      dealDamage: "Answer correctly to deal damage!",
      answerCorrectly: "Answer correctly to",
      secondsToAnswer: "You have {time} seconds to answer!",
      freeRevival: "💖 Don't worry - you get one free revival if you die!"
    },
    stats: {
      heroStatus: "Hero Status",
      characterLevel: "Character Level",
      health: "Health",
      attack: "Attack",
      defense: "Defense",
      currentZone: "Current Zone",
      coins: "Coins",
      gems: "Gems",
      shiny: "Shiny",
      startAdventure: "Start Adventure",
      defeated: "You are defeated!",
      noLives: "No lives remaining!",
      changeMode: "Change game mode or reset to continue!",
      getBetter: "Visit the shop to get better equipment and try again!",
      premiumUnlocked: "🎉 PREMIUM MEMBER UNLOCKED! 🎉",
      premiumMember: "👑 PREMIUM MEMBER",
      premiumDescription: "You've reached Zone 50! Enjoy exclusive rewards and special features!"
    },
    garden: {
      title: "Garden of Growth",
      subtitle: "Grow plants for permanent stat bonuses",
      plantSeed: "Plant Your First Seed",
      howItWorks: "How it works:",
      features: [
        "Plant costs {cost} coins (one-time)",
        "Every cm of growth = +5% bonus to ALL stats (ATK, DEF, HP)",
        "Grows automatically, even when offline",
        "Must keep watered to continue growing",
        "Water costs {waterCost} coins per 24 hours",
        "Maximum growth: {maxGrowth}cm (+{maxBonus}% bonus!)"
      ],
      yourCoins: "Your coins:",
      notEnough: "Not enough coins",
      growthStage: "Growth",
      statBonus: "Stat Bonus",
      water: "Water",
      remaining: "Remaining",
      growthProgress: "Growth Progress",
      waterLow: "Water Running Low!",
      waterLowDesc: "Your plant will stop growing when water runs out.",
      buyWater: "Buy Water",
      cost: "Cost:",
      buyWaterButton: "Buy Water ({label})",
      tip: "💡 Your plant grows in real-time, even when you're not playing!",
      description: "The Garden of Growth provides permanent stat bonuses that stack with research."
    },
    settings: {
      title: "Game Settings",
      subtitle: "Customize your game experience",
      visual: "Visual Settings",
      colorblind: "Colorblind Mode",
      colorblindDesc: "Enhanced contrast and patterns for better visibility",
      darkMode: "Dark Mode",
      darkModeDesc: "Toggle dark/light theme",
      language: "Language",
      notifications: "Notifications",
      notificationsDesc: "Game notifications and alerts",
      languageNote: "🌍 Choose your preferred language for the game interface.",
      autoSaved: "Settings are automatically saved to your device."
    },
    common: {
      close: "Close",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      level: "Level",
      experience: "XP",
      skillPoints: "SP",
      accuracy: "Accuracy",
      total: "Total",
      progress: "Progress",
      unlocked: "Unlocked",
      locked: "Locked",
      claimed: "Claimed",
      available: "Available",
      max: "Max",
      upgrade: "Upgrade",
      sell: "Sell",
      equip: "Equip",
      equipped: "Equipped"
    }
  },
  
  es: {
    welcome: {
      title: "🏰 ¡Bienvenido a Hugoland! 🗡️",
      subtitle: "¡El juego de aventuras fantásticas definitivo donde el conocimiento es tu mejor arma!",
      features: [
        "Responde preguntas de trivia para derrotar enemigos",
        "Recolecta armas y armaduras poderosas",
        "Extrae gemas y encuentra gemas brillantes raras",
        "Desbloquea logros y construye rachas de conocimiento",
        "Explora múltiples modos de juego y desafíos",
        "Progresa a través de zonas infinitas de aventura",
        "Descubre reliquias antiguas en el Mercado Yojef",
        "Sube de nivel y desbloquea habilidades poderosas",
        "Gana recompensas diarias y progreso offline",
        "Cultiva plantas en el Jardín del Crecimiento"
      ],
      startButton: "Comienza Tu Aventura",
      footer: "Comienza tu viaje en el mundo mágico de Hugoland"
    },
    nav: {
      hero: "Héroe",
      research: "Investigación",
      shop: "Tienda",
      inventory: "Inventario",
      mining: "Minería",
      menu: "Menú",
      back: "Volver al Juego"
    },
    combat: {
      zone: "Zona",
      streak: "¡Racha de Conocimiento!",
      streakBonus: "bonificación de recompensa",
      correctAnswers: "respuestas correctas seguidas",
      timeLeft: "s",
      revivalAvailable: "Revivir Disponible",
      revivalReady: "💖 Revivir Listo",
      correct: "🎉 ¡Correcto! ¡Infliges daño!",
      wrong: "❌ ¡Incorrecto! ¡El enemigo te ataca!",
      dealDamage: "¡Responde correctamente para infligir daño!",
      answerCorrectly: "Responde correctamente para",
      secondsToAnswer: "¡Tienes {time} segundos para responder!",
      freeRevival: "💖 No te preocupes - ¡tienes una revivir gratis si mueres!"
    },
    stats: {
      heroStatus: "Estado del Héroe",
      characterLevel: "Nivel del Personaje",
      health: "Salud",
      attack: "Ataque",
      defense: "Defensa",
      currentZone: "Zona Actual",
      coins: "Monedas",
      gems: "Gemas",
      shiny: "Brillante",
      startAdventure: "Comenzar Aventura",
      defeated: "¡Has sido derrotado!",
      noLives: "¡No quedan vidas!",
      changeMode: "¡Cambia el modo de juego o reinicia para continuar!",
      getBetter: "¡Visita la tienda para conseguir mejor equipo e inténtalo de nuevo!",
      premiumUnlocked: "🎉 ¡MIEMBRO PREMIUM DESBLOQUEADO! 🎉",
      premiumMember: "👑 MIEMBRO PREMIUM",
      premiumDescription: "¡Has alcanzado la Zona 50! ¡Disfruta de recompensas exclusivas y características especiales!"
    },
    garden: {
      title: "Jardín del Crecimiento",
      subtitle: "Cultiva plantas para bonificaciones permanentes de estadísticas",
      plantSeed: "Planta Tu Primera Semilla",
      howItWorks: "Cómo funciona:",
      features: [
        "Plantar cuesta {cost} monedas (una vez)",
        "Cada cm de crecimiento = +5% de bonificación a TODAS las estadísticas (ATQ, DEF, HP)",
        "Crece automáticamente, incluso cuando estás offline",
        "Debe mantenerse regado para seguir creciendo",
        "El agua cuesta {waterCost} monedas por 24 horas",
        "Crecimiento máximo: {maxGrowth}cm (¡+{maxBonus}% de bonificación!)"
      ],
      yourCoins: "Tus monedas:",
      notEnough: "No hay suficientes monedas",
      growthStage: "Crecimiento",
      statBonus: "Bonificación de Estadísticas",
      water: "Agua",
      remaining: "Restante",
      growthProgress: "Progreso de Crecimiento",
      waterLow: "¡Agua Escaseando!",
      waterLowDesc: "Tu planta dejará de crecer cuando se acabe el agua.",
      buyWater: "Comprar Agua",
      cost: "Costo:",
      buyWaterButton: "Comprar Agua ({label})",
      tip: "💡 ¡Tu planta crece en tiempo real, incluso cuando no estás jugando!",
      description: "El Jardín del Crecimiento proporciona bonificaciones permanentes de estadísticas que se acumulan con la investigación."
    },
    settings: {
      title: "Configuración del Juego",
      subtitle: "Personaliza tu experiencia de juego",
      visual: "Configuración Visual",
      colorblind: "Modo Daltónico",
      colorblindDesc: "Contraste mejorado y patrones para mejor visibilidad",
      darkMode: "Modo Oscuro",
      darkModeDesc: "Alternar tema oscuro/claro",
      language: "Idioma",
      notifications: "Notificaciones",
      notificationsDesc: "Notificaciones y alertas del juego",
      languageNote: "🌍 Elige tu idioma preferido para la interfaz del juego.",
      autoSaved: "La configuración se guarda automáticamente en tu dispositivo."
    },
    common: {
      close: "Cerrar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      save: "Guardar",
      loading: "Cargando...",
      error: "Error",
      success: "Éxito",
      level: "Nivel",
      experience: "EXP",
      skillPoints: "PH",
      accuracy: "Precisión",
      total: "Total",
      progress: "Progreso",
      unlocked: "Desbloqueado",
      locked: "Bloqueado",
      claimed: "Reclamado",
      available: "Disponible",
      max: "Máx",
      upgrade: "Mejorar",
      sell: "Vender",
      equip: "Equipar",
      equipped: "Equipado"
    }
  },
  
  fr: {
    welcome: {
      title: "🏰 Bienvenue à Hugoland ! 🗡️",
      subtitle: "Le jeu d'aventure fantastique ultime où la connaissance est votre plus grande arme !",
      features: [
        "Répondez aux questions de trivia pour vaincre les ennemis",
        "Collectez des armes et armures puissantes",
        "Extrayez des gemmes et trouvez des gemmes brillantes rares",
        "Débloquez des succès et construisez des séries de connaissances",
        "Explorez plusieurs modes de jeu et défis",
        "Progressez à travers des zones infinies d'aventure",
        "Découvrez des reliques anciennes au Marché Yojef",
        "Montez de niveau et débloquez des compétences puissantes",
        "Gagnez des récompenses quotidiennes et des progrès hors ligne",
        "Cultivez des plantes dans le Jardin de Croissance"
      ],
      startButton: "Commencez Votre Aventure",
      footer: "Commencez votre voyage dans le monde magique de Hugoland"
    },
    nav: {
      hero: "Héros",
      research: "Recherche",
      shop: "Boutique",
      inventory: "Inventaire",
      mining: "Minage",
      menu: "Menu",
      back: "Retour au Jeu"
    },
    combat: {
      zone: "Zone",
      streak: "Série de Connaissances !",
      streakBonus: "bonus de récompense",
      correctAnswers: "bonnes réponses d'affilée",
      timeLeft: "s",
      revivalAvailable: "Résurrection Disponible",
      revivalReady: "💖 Résurrection Prête",
      correct: "🎉 Correct ! Vous infligez des dégâts !",
      wrong: "❌ Faux ! L'ennemi vous attaque !",
      dealDamage: "Répondez correctement pour infliger des dégâts !",
      answerCorrectly: "Répondez correctement pour",
      secondsToAnswer: "Vous avez {time} secondes pour répondre !",
      freeRevival: "💖 Ne vous inquiétez pas - vous avez une résurrection gratuite si vous mourez !"
    },
    stats: {
      heroStatus: "Statut du Héros",
      characterLevel: "Niveau du Personnage",
      health: "Santé",
      attack: "Attaque",
      defense: "Défense",
      currentZone: "Zone Actuelle",
      coins: "Pièces",
      gems: "Gemmes",
      shiny: "Brillant",
      startAdventure: "Commencer l'Aventure",
      defeated: "Vous êtes vaincu !",
      noLives: "Plus de vies !",
      changeMode: "Changez de mode de jeu ou redémarrez pour continuer !",
      getBetter: "Visitez la boutique pour obtenir un meilleur équipement et réessayez !",
      premiumUnlocked: "🎉 MEMBRE PREMIUM DÉBLOQUÉ ! 🎉",
      premiumMember: "👑 MEMBRE PREMIUM",
      premiumDescription: "Vous avez atteint la Zone 50 ! Profitez de récompenses exclusives et de fonctionnalités spéciales !"
    },
    garden: {
      title: "Jardin de Croissance",
      subtitle: "Cultivez des plantes pour des bonus de statistiques permanents",
      plantSeed: "Plantez Votre Première Graine",
      howItWorks: "Comment ça marche :",
      features: [
        "Planter coûte {cost} pièces (une fois)",
        "Chaque cm de croissance = +5% de bonus à TOUTES les statistiques (ATQ, DÉF, HP)",
        "Pousse automatiquement, même quand vous êtes hors ligne",
        "Doit être arrosé pour continuer à pousser",
        "L'eau coûte {waterCost} pièces par 24 heures",
        "Croissance maximale : {maxGrowth}cm (+{maxBonus}% de bonus !)"
      ],
      yourCoins: "Vos pièces :",
      notEnough: "Pas assez de pièces",
      growthStage: "Croissance",
      statBonus: "Bonus de Statistiques",
      water: "Eau",
      remaining: "Restant",
      growthProgress: "Progrès de Croissance",
      waterLow: "Eau Faible !",
      waterLowDesc: "Votre plante arrêtera de pousser quand l'eau sera épuisée.",
      buyWater: "Acheter de l'Eau",
      cost: "Coût :",
      buyWaterButton: "Acheter de l'Eau ({label})",
      tip: "💡 Votre plante pousse en temps réel, même quand vous ne jouez pas !",
      description: "Le Jardin de Croissance fournit des bonus de statistiques permanents qui s'accumulent avec la recherche."
    },
    settings: {
      title: "Paramètres du Jeu",
      subtitle: "Personnalisez votre expérience de jeu",
      visual: "Paramètres Visuels",
      colorblind: "Mode Daltonien",
      colorblindDesc: "Contraste amélioré et motifs pour une meilleure visibilité",
      darkMode: "Mode Sombre",
      darkModeDesc: "Basculer le thème sombre/clair",
      language: "Langue",
      notifications: "Notifications",
      notificationsDesc: "Notifications et alertes du jeu",
      languageNote: "🌍 Choisissez votre langue préférée pour l'interface du jeu.",
      autoSaved: "Les paramètres sont automatiquement sauvegardés sur votre appareil."
    },
    common: {
      close: "Fermer",
      cancel: "Annuler",
      confirm: "Confirmer",
      save: "Sauvegarder",
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
      level: "Niveau",
      experience: "EXP",
      skillPoints: "PC",
      accuracy: "Précision",
      total: "Total",
      progress: "Progrès",
      unlocked: "Débloqué",
      locked: "Verrouillé",
      claimed: "Réclamé",
      available: "Disponible",
      max: "Max",
      upgrade: "Améliorer",
      sell: "Vendre",
      equip: "Équiper",
      equipped: "Équipé"
    }
  },

  de: {
    welcome: {
      title: "🏰 Willkommen in Hugoland! 🗡️",
      subtitle: "Das ultimative Fantasy-Abenteuerspiel, in dem Wissen deine stärkste Waffe ist!",
      features: [
        "Beantworte Trivia-Fragen, um Feinde zu besiegen",
        "Sammle mächtige Waffen und Rüstungen",
        "Baue Edelsteine ab und finde seltene glänzende Edelsteine",
        "Schalte Erfolge frei und baue Wissensserien auf",
        "Erkunde mehrere Spielmodi und Herausforderungen",
        "Schreite durch unendliche Abenteuerzonen voran",
        "Entdecke antike Relikte im Yojef-Markt",
        "Steige auf und schalte mächtige Fähigkeiten frei",
        "Verdiene tägliche Belohnungen und Offline-Fortschritt",
        "Züchte Pflanzen im Garten des Wachstums"
      ],
      startButton: "Starte Dein Abenteuer",
      footer: "Beginne deine Reise in der magischen Welt von Hugoland"
    },
    nav: {
      hero: "Held",
      research: "Forschung",
      shop: "Laden",
      inventory: "Inventar",
      mining: "Bergbau",
      menu: "Menü",
      back: "Zurück zum Spiel"
    },
    combat: {
      zone: "Zone",
      streak: "Wissens-Serie!",
      streakBonus: "Belohnungsbonus",
      correctAnswers: "richtige Antworten in Folge",
      timeLeft: "s",
      revivalAvailable: "Wiederbelebung Verfügbar",
      revivalReady: "💖 Wiederbelebung Bereit",
      correct: "🎉 Richtig! Du verursachst Schaden!",
      wrong: "❌ Falsch! Der Feind greift dich an!",
      dealDamage: "Antworte richtig, um Schaden zu verursachen!",
      answerCorrectly: "Antworte richtig, um",
      secondsToAnswer: "Du hast {time} Sekunden zum Antworten!",
      freeRevival: "💖 Keine Sorge - du bekommst eine kostenlose Wiederbelebung, wenn du stirbst!"
    },
    stats: {
      heroStatus: "Helden-Status",
      characterLevel: "Charakter-Level",
      health: "Gesundheit",
      attack: "Angriff",
      defense: "Verteidigung",
      currentZone: "Aktuelle Zone",
      coins: "Münzen",
      gems: "Edelsteine",
      shiny: "Glänzend",
      startAdventure: "Abenteuer Starten",
      defeated: "Du bist besiegt!",
      noLives: "Keine Leben mehr!",
      changeMode: "Ändere den Spielmodus oder setze zurück, um fortzufahren!",
      getBetter: "Besuche den Laden für bessere Ausrüstung und versuche es erneut!",
      premiumUnlocked: "🎉 PREMIUM-MITGLIED FREIGESCHALTET! 🎉",
      premiumMember: "👑 PREMIUM-MITGLIED",
      premiumDescription: "Du hast Zone 50 erreicht! Genieße exklusive Belohnungen und besondere Features!"
    },
    garden: {
      title: "Garten des Wachstums",
      subtitle: "Züchte Pflanzen für permanente Stat-Boni",
      plantSeed: "Pflanze Deinen Ersten Samen",
      howItWorks: "So funktioniert es:",
      features: [
        "Pflanzen kostet {cost} Münzen (einmalig)",
        "Jeder cm Wachstum = +5% Bonus auf ALLE Stats (ATK, DEF, HP)",
        "Wächst automatisch, auch wenn offline",
        "Muss bewässert bleiben, um weiter zu wachsen",
        "Wasser kostet {waterCost} Münzen pro 24 Stunden",
        "Maximales Wachstum: {maxGrowth}cm (+{maxBonus}% Bonus!)"
      ],
      yourCoins: "Deine Münzen:",
      notEnough: "Nicht genug Münzen",
      growthStage: "Wachstum",
      statBonus: "Stat-Bonus",
      water: "Wasser",
      remaining: "Verbleibend",
      growthProgress: "Wachstumsfortschritt",
      waterLow: "Wasser wird knapp!",
      waterLowDesc: "Deine Pflanze hört auf zu wachsen, wenn das Wasser ausgeht.",
      buyWater: "Wasser Kaufen",
      cost: "Kosten:",
      buyWaterButton: "Wasser Kaufen ({label})",
      tip: "💡 Deine Pflanze wächst in Echtzeit, auch wenn du nicht spielst!",
      description: "Der Garten des Wachstums bietet permanente Stat-Boni, die sich mit der Forschung stapeln."
    },
    settings: {
      title: "Spiel-Einstellungen",
      subtitle: "Passe dein Spielerlebnis an",
      visual: "Visuelle Einstellungen",
      colorblind: "Farbenblind-Modus",
      colorblindDesc: "Verbesserter Kontrast und Muster für bessere Sichtbarkeit",
      darkMode: "Dunkler Modus",
      darkModeDesc: "Zwischen dunklem/hellem Theme wechseln",
      language: "Sprache",
      notifications: "Benachrichtigungen",
      notificationsDesc: "Spiel-Benachrichtigungen und Warnungen",
      languageNote: "🌍 Wähle deine bevorzugte Sprache für die Spiel-Oberfläche.",
      autoSaved: "Einstellungen werden automatisch auf deinem Gerät gespeichert."
    },
    common: {
      close: "Schließen",
      cancel: "Abbrechen",
      confirm: "Bestätigen",
      save: "Speichern",
      loading: "Lädt...",
      error: "Fehler",
      success: "Erfolg",
      level: "Level",
      experience: "EP",
      skillPoints: "FP",
      accuracy: "Genauigkeit",
      total: "Gesamt",
      progress: "Fortschritt",
      unlocked: "Freigeschaltet",
      locked: "Gesperrt",
      claimed: "Beansprucht",
      available: "Verfügbar",
      max: "Max",
      upgrade: "Verbessern",
      sell: "Verkaufen",
      equip: "Ausrüsten",
      equipped: "Ausgerüstet"
    }
  },

  pt: {
    welcome: {
      title: "🏰 Bem-vindo ao Hugoland! 🗡️",
      subtitle: "O jogo de aventura fantástica definitivo onde o conhecimento é sua maior arma!",
      features: [
        "Responda perguntas de trivia para derrotar inimigos",
        "Colete armas e armaduras poderosas",
        "Mine gemas e encontre gemas brilhantes raras",
        "Desbloqueie conquistas e construa sequências de conhecimento",
        "Explore múltiplos modos de jogo e desafios",
        "Progrida através de zonas infinitas de aventura",
        "Descubra relíquias antigas no Mercado Yojef",
        "Suba de nível e desbloqueie habilidades poderosas",
        "Ganhe recompensas diárias e progresso offline",
        "Cultive plantas no Jardim do Crescimento"
      ],
      startButton: "Comece Sua Aventura",
      footer: "Comece sua jornada no mundo mágico de Hugoland"
    },
    nav: {
      hero: "Herói",
      research: "Pesquisa",
      shop: "Loja",
      inventory: "Inventário",
      mining: "Mineração",
      menu: "Menu",
      back: "Voltar ao Jogo"
    },
    combat: {
      zone: "Zona",
      streak: "Sequência de Conhecimento!",
      streakBonus: "bônus de recompensa",
      correctAnswers: "respostas corretas seguidas",
      timeLeft: "s",
      revivalAvailable: "Reviver Disponível",
      revivalReady: "💖 Reviver Pronto",
      correct: "🎉 Correto! Você causa dano!",
      wrong: "❌ Errado! O inimigo te ataca!",
      dealDamage: "Responda corretamente para causar dano!",
      answerCorrectly: "Responda corretamente para",
      secondsToAnswer: "Você tem {time} segundos para responder!",
      freeRevival: "💖 Não se preocupe - você tem um reviver grátis se morrer!"
    },
    stats: {
      heroStatus: "Status do Herói",
      characterLevel: "Nível do Personagem",
      health: "Saúde",
      attack: "Ataque",
      defense: "Defesa",
      currentZone: "Zona Atual",
      coins: "Moedas",
      gems: "Gemas",
      shiny: "Brilhante",
      startAdventure: "Começar Aventura",
      defeated: "Você foi derrotado!",
      noLives: "Sem vidas restantes!",
      changeMode: "Mude o modo de jogo ou reinicie para continuar!",
      getBetter: "Visite a loja para conseguir melhor equipamento e tente novamente!",
      premiumUnlocked: "🎉 MEMBRO PREMIUM DESBLOQUEADO! 🎉",
      premiumMember: "👑 MEMBRO PREMIUM",
      premiumDescription: "Você alcançou a Zona 50! Aproveite recompensas exclusivas e recursos especiais!"
    },
    garden: {
      title: "Jardim do Crescimento",
      subtitle: "Cultive plantas para bônus permanentes de atributos",
      plantSeed: "Plante Sua Primeira Semente",
      howItWorks: "Como funciona:",
      features: [
        "Plantar custa {cost} moedas (uma vez)",
        "Cada cm de crescimento = +5% de bônus para TODOS os atributos (ATK, DEF, HP)",
        "Cresce automaticamente, mesmo quando offline",
        "Deve ser regado para continuar crescendo",
        "Água custa {waterCost} moedas por 24 horas",
        "Crescimento máximo: {maxGrowth}cm (+{maxBonus}% de bônus!)"
      ],
      yourCoins: "Suas moedas:",
      notEnough: "Moedas insuficientes",
      growthStage: "Crescimento",
      statBonus: "Bônus de Atributos",
      water: "Água",
      remaining: "Restante",
      growthProgress: "Progresso do Crescimento",
      waterLow: "Água Acabando!",
      waterLowDesc: "Sua planta parará de crescer quando a água acabar.",
      buyWater: "Comprar Água",
      cost: "Custo:",
      buyWaterButton: "Comprar Água ({label})",
      tip: "💡 Sua planta cresce em tempo real, mesmo quando você não está jogando!",
      description: "O Jardim do Crescimento fornece bônus permanentes de atributos que se acumulam com a pesquisa."
    },
    settings: {
      title: "Configurações do Jogo",
      subtitle: "Personalize sua experiência de jogo",
      visual: "Configurações Visuais",
      colorblind: "Modo Daltônico",
      colorblindDesc: "Contraste aprimorado e padrões para melhor visibilidade",
      darkMode: "Modo Escuro",
      darkModeDesc: "Alternar tema escuro/claro",
      language: "Idioma",
      notifications: "Notificações",
      notificationsDesc: "Notificações e alertas do jogo",
      languageNote: "🌍 Escolha seu idioma preferido para a interface do jogo.",
      autoSaved: "As configurações são salvas automaticamente no seu dispositivo."
    },
    common: {
      close: "Fechar",
      cancel: "Cancelar",
      confirm: "Confirmar",
      save: "Salvar",
      loading: "Carregando...",
      error: "Erro",
      success: "Sucesso",
      level: "Nível",
      experience: "EXP",
      skillPoints: "PH",
      accuracy: "Precisão",
      total: "Total",
      progress: "Progresso",
      unlocked: "Desbloqueado",
      locked: "Bloqueado",
      claimed: "Reivindicado",
      available: "Disponível",
      max: "Máx",
      upgrade: "Melhorar",
      sell: "Vender",
      equip: "Equipar",
      equipped: "Equipado"
    }
  },

  it: {
    welcome: {
      title: "🏰 Benvenuto a Hugoland! 🗡️",
      subtitle: "Il gioco di avventura fantasy definitivo dove la conoscenza è la tua arma più potente!",
      features: [
        "Rispondi a domande di trivia per sconfiggere i nemici",
        "Raccogli armi e armature potenti",
        "Estrai gemme e trova gemme brillanti rare",
        "Sblocca achievement e costruisci serie di conoscenza",
        "Esplora modalità di gioco multiple e sfide",
        "Progredisci attraverso zone infinite di avventura",
        "Scopri reliquie antiche nel Mercato Yojef",
        "Sali di livello e sblocca abilità potenti",
        "Guadagna ricompense giornaliere e progresso offline",
        "Coltiva piante nel Giardino della Crescita"
      ],
      startButton: "Inizia la Tua Avventura",
      footer: "Inizia il tuo viaggio nel mondo magico di Hugoland"
    },
    nav: {
      hero: "Eroe",
      research: "Ricerca",
      shop: "Negozio",
      inventory: "Inventario",
      mining: "Estrazione",
      menu: "Menu",
      back: "Torna al Gioco"
    },
    combat: {
      zone: "Zona",
      streak: "Serie di Conoscenza!",
      streakBonus: "bonus ricompensa",
      correctAnswers: "risposte corrette di fila",
      timeLeft: "s",
      revivalAvailable: "Resurrezione Disponibile",
      revivalReady: "💖 Resurrezione Pronta",
      correct: "🎉 Corretto! Infliggi danno!",
      wrong: "❌ Sbagliato! Il nemico ti attacca!",
      dealDamage: "Rispondi correttamente per infliggere danno!",
      answerCorrectly: "Rispondi correttamente per",
      secondsToAnswer: "Hai {time} secondi per rispondere!",
      freeRevival: "💖 Non preoccuparti - hai una resurrezione gratuita se muori!"
    },
    stats: {
      heroStatus: "Stato dell'Eroe",
      characterLevel: "Livello del Personaggio",
      health: "Salute",
      attack: "Attacco",
      defense: "Difesa",
      currentZone: "Zona Attuale",
      coins: "Monete",
      gems: "Gemme",
      shiny: "Brillante",
      startAdventure: "Inizia Avventura",
      defeated: "Sei stato sconfitto!",
      noLives: "Nessuna vita rimasta!",
      changeMode: "Cambia modalità di gioco o resetta per continuare!",
      getBetter: "Visita il negozio per ottenere equipaggiamento migliore e riprova!",
      premiumUnlocked: "🎉 MEMBRO PREMIUM SBLOCCATO! 🎉",
      premiumMember: "👑 MEMBRO PREMIUM",
      premiumDescription: "Hai raggiunto la Zona 50! Goditi ricompense esclusive e funzionalità speciali!"
    },
    garden: {
      title: "Giardino della Crescita",
      subtitle: "Coltiva piante per bonus permanenti alle statistiche",
      plantSeed: "Pianta il Tuo Primo Seme",
      howItWorks: "Come funziona:",
      features: [
        "Piantare costa {cost} monete (una volta)",
        "Ogni cm di crescita = +5% bonus a TUTTE le statistiche (ATK, DEF, HP)",
        "Cresce automaticamente, anche quando offline",
        "Deve essere annaffiato per continuare a crescere",
        "L'acqua costa {waterCost} monete per 24 ore",
        "Crescita massima: {maxGrowth}cm (+{maxBonus}% bonus!)"
      ],
      yourCoins: "Le tue monete:",
      notEnough: "Monete insufficienti",
      growthStage: "Crescita",
      statBonus: "Bonus Statistiche",
      water: "Acqua",
      remaining: "Rimanente",
      growthProgress: "Progresso della Crescita",
      waterLow: "Acqua in Esaurimento!",
      waterLowDesc: "La tua pianta smetterà di crescere quando l'acqua finirà.",
      buyWater: "Compra Acqua",
      cost: "Costo:",
      buyWaterButton: "Compra Acqua ({label})",
      tip: "💡 La tua pianta cresce in tempo reale, anche quando non stai giocando!",
      description: "Il Giardino della Crescita fornisce bonus permanenti alle statistiche che si accumulano con la ricerca."
    },
    settings: {
      title: "Impostazioni del Gioco",
      subtitle: "Personalizza la tua esperienza di gioco",
      visual: "Impostazioni Visive",
      colorblind: "Modalità Daltonici",
      colorblindDesc: "Contrasto migliorato e pattern per migliore visibilità",
      darkMode: "Modalità Scura",
      darkModeDesc: "Cambia tema scuro/chiaro",
      language: "Lingua",
      notifications: "Notifiche",
      notificationsDesc: "Notifiche e avvisi del gioco",
      languageNote: "🌍 Scegli la tua lingua preferita per l'interfaccia del gioco.",
      autoSaved: "Le impostazioni vengono salvate automaticamente sul tuo dispositivo."
    },
    common: {
      close: "Chiudi",
      cancel: "Annulla",
      confirm: "Conferma",
      save: "Salva",
      loading: "Caricamento...",
      error: "Errore",
      success: "Successo",
      level: "Livello",
      experience: "ESP",
      skillPoints: "PA",
      accuracy: "Precisione",
      total: "Totale",
      progress: "Progresso",
      unlocked: "Sbloccato",
      locked: "Bloccato",
      claimed: "Rivendicato",
      available: "Disponibile",
      max: "Max",
      upgrade: "Migliora",
      sell: "Vendi",
      equip: "Equipaggia",
      equipped: "Equipaggiato"
    }
  },

  ru: {
    welcome: {
      title: "🏰 Добро пожаловать в Хьюголенд! 🗡️",
      subtitle: "Лучшая фэнтезийная приключенческая игра, где знания - ваше самое мощное оружие!",
      features: [
        "Отвечайте на вопросы викторины, чтобы побеждать врагов",
        "Собирайте мощное оружие и броню",
        "Добывайте драгоценные камни и находите редкие блестящие камни",
        "Открывайте достижения и создавайте серии знаний",
        "Исследуйте множественные игровые режимы и вызовы",
        "Продвигайтесь через бесконечные зоны приключений",
        "Открывайте древние реликвии на Рынке Йожеф",
        "Повышайте уровень и открывайте мощные навыки",
        "Получайте ежедневные награды и офлайн прогресс",
        "Выращивайте растения в Саду Роста"
      ],
      startButton: "Начните Ваше Приключение",
      footer: "Начните ваше путешествие в магическом мире Хьюголенда"
    },
    nav: {
      hero: "Герой",
      research: "Исследования",
      shop: "Магазин",
      inventory: "Инвентарь",
      mining: "Добыча",
      menu: "Меню",
      back: "Назад к Игре"
    },
    combat: {
      zone: "Зона",
      streak: "Серия Знаний!",
      streakBonus: "бонус к награде",
      correctAnswers: "правильных ответов подряд",
      timeLeft: "с",
      revivalAvailable: "Воскрешение Доступно",
      revivalReady: "💖 Воскрешение Готово",
      correct: "🎉 Правильно! Вы наносите урон!",
      wrong: "❌ Неправильно! Враг атакует вас!",
      dealDamage: "Отвечайте правильно, чтобы наносить урон!",
      answerCorrectly: "Отвечайте правильно, чтобы",
      secondsToAnswer: "У вас есть {time} секунд для ответа!",
      freeRevival: "💖 Не волнуйтесь - у вас есть одно бесплатное воскрешение, если вы умрете!"
    },
    stats: {
      heroStatus: "Статус Героя",
      characterLevel: "Уровень Персонажа",
      health: "Здоровье",
      attack: "Атака",
      defense: "Защита",
      currentZone: "Текущая Зона",
      coins: "Монеты",
      gems: "Драгоценности",
      shiny: "Блестящие",
      startAdventure: "Начать Приключение",
      defeated: "Вы побеждены!",
      noLives: "Жизней не осталось!",
      changeMode: "Смените игровой режим или сбросьте, чтобы продолжить!",
      getBetter: "Посетите магазин для лучшего снаряжения и попробуйте снова!",
      premiumUnlocked: "🎉 ПРЕМИУМ УЧАСТНИК РАЗБЛОКИРОВАН! 🎉",
      premiumMember: "👑 ПРЕМИУМ УЧАСТНИК",
      premiumDescription: "Вы достигли Зоны 50! Наслаждайтесь эксклюзивными наградами и особыми функциями!"
    },
    garden: {
      title: "Сад Роста",
      subtitle: "Выращивайте растения для постоянных бонусов к характеристикам",
      plantSeed: "Посадите Ваше Первое Семя",
      howItWorks: "Как это работает:",
      features: [
        "Посадка стоит {cost} монет (одноразово)",
        "Каждый см роста = +5% бонус ко ВСЕМ характеристикам (АТК, ЗАЩ, ЗД)",
        "Растет автоматически, даже в офлайне",
        "Должно поливаться для продолжения роста",
        "Вода стоит {waterCost} монет за 24 часа",
        "Максимальный рост: {maxGrowth}см (+{maxBonus}% бонус!)"
      ],
      yourCoins: "Ваши монеты:",
      notEnough: "Недостаточно монет",
      growthStage: "Рост",
      statBonus: "Бонус Характеристик",
      water: "Вода",
      remaining: "Осталось",
      growthProgress: "Прогресс Роста",
      waterLow: "Вода Заканчивается!",
      waterLowDesc: "Ваше растение перестанет расти, когда закончится вода.",
      buyWater: "Купить Воду",
      cost: "Стоимость:",
      buyWaterButton: "Купить Воду ({label})",
      tip: "💡 Ваше растение растет в реальном времени, даже когда вы не играете!",
      description: "Сад Роста предоставляет постоянные бонусы к характеристикам, которые складываются с исследованиями."
    },
    settings: {
      title: "Настройки Игры",
      subtitle: "Настройте ваш игровой опыт",
      visual: "Визуальные Настройки",
      colorblind: "Режим для Дальтоников",
      colorblindDesc: "Улучшенный контраст и узоры для лучшей видимости",
      darkMode: "Темный Режим",
      darkModeDesc: "Переключить темную/светлую тему",
      language: "Язык",
      notifications: "Уведомления",
      notificationsDesc: "Игровые уведомления и оповещения",
      languageNote: "🌍 Выберите предпочитаемый язык для интерфейса игры.",
      autoSaved: "Настройки автоматически сохраняются на вашем устройстве."
    },
    common: {
      close: "Закрыть",
      cancel: "Отмена",
      confirm: "Подтвердить",
      save: "Сохранить",
      loading: "Загрузка...",
      error: "Ошибка",
      success: "Успех",
      level: "Уровень",
      experience: "ОПЫТ",
      skillPoints: "ОН",
      accuracy: "Точность",
      total: "Всего",
      progress: "Прогресс",
      unlocked: "Разблокировано",
      locked: "Заблокировано",
      claimed: "Получено",
      available: "Доступно",
      max: "Макс",
      upgrade: "Улучшить",
      sell: "Продать",
      equip: "Экипировать",
      equipped: "Экипировано"
    }
  },

  ja: {
    welcome: {
      title: "🏰 ヒューゴランドへようこそ！ 🗡️",
      subtitle: "知識が最強の武器となる究極のファンタジーアドベンチャーゲーム！",
      features: [
        "トリビア問題に答えて敵を倒そう",
        "強力な武器と防具を集めよう",
        "宝石を採掘し、レアな光る宝石を見つけよう",
        "実績を解除し、知識の連続記録を築こう",
        "複数のゲームモードとチャレンジを探索しよう",
        "無限の冒険ゾーンを進もう",
        "ヨジェフマーケットで古代の遺物を発見しよう",
        "レベルアップして強力なスキルを解除しよう",
        "毎日の報酬とオフライン進行を獲得しよう",
        "成長の庭で植物を育てよう"
      ],
      startButton: "冒険を始める",
      footer: "ヒューゴランドの魔法の世界での旅を始めよう"
    },
    nav: {
      hero: "ヒーロー",
      research: "研究",
      shop: "ショップ",
      inventory: "インベントリ",
      mining: "採掘",
      menu: "メニュー",
      back: "ゲームに戻る"
    },
    combat: {
      zone: "ゾーン",
      streak: "知識の連続記録！",
      streakBonus: "報酬ボーナス",
      correctAnswers: "連続正解",
      timeLeft: "秒",
      revivalAvailable: "復活可能",
      revivalReady: "💖 復活準備完了",
      correct: "🎉 正解！ダメージを与えました！",
      wrong: "❌ 不正解！敵があなたを攻撃します！",
      dealDamage: "正解してダメージを与えよう！",
      answerCorrectly: "正解して",
      secondsToAnswer: "答える時間は{time}秒です！",
      freeRevival: "💖 心配しないで - 死んでも無料で一度復活できます！"
    },
    stats: {
      heroStatus: "ヒーローステータス",
      characterLevel: "キャラクターレベル",
      health: "体力",
      attack: "攻撃力",
      defense: "防御力",
      currentZone: "現在のゾーン",
      coins: "コイン",
      gems: "宝石",
      shiny: "光る",
      startAdventure: "冒険開始",
      defeated: "あなたは敗北しました！",
      noLives: "残りライフがありません！",
      changeMode: "ゲームモードを変更するかリセットして続行してください！",
      getBetter: "ショップでより良い装備を手に入れて再挑戦してください！",
      premiumUnlocked: "🎉 プレミアムメンバー解除！ 🎉",
      premiumMember: "👑 プレミアムメンバー",
      premiumDescription: "ゾーン50に到達しました！限定報酬と特別機能をお楽しみください！"
    },
    garden: {
      title: "成長の庭",
      subtitle: "植物を育てて永続的なステータスボーナスを得よう",
      plantSeed: "最初の種を植える",
      howItWorks: "仕組み：",
      features: [
        "植える費用は{cost}コイン（一回限り）",
        "成長1cm = 全ステータス（ATK、DEF、HP）に+5%ボーナス",
        "オフライン中でも自動的に成長",
        "成長を続けるには水やりが必要",
        "水は24時間あたり{waterCost}コイン",
        "最大成長：{maxGrowth}cm（+{maxBonus}%ボーナス！）"
      ],
      yourCoins: "あなたのコイン：",
      notEnough: "コインが足りません",
      growthStage: "成長",
      statBonus: "ステータスボーナス",
      water: "水",
      remaining: "残り",
      growthProgress: "成長進度",
      waterLow: "水が少なくなっています！",
      waterLowDesc: "水がなくなると植物の成長が止まります。",
      buyWater: "水を購入",
      cost: "費用：",
      buyWaterButton: "水を購入（{label}）",
      tip: "💡 あなたの植物はプレイしていない時でもリアルタイムで成長します！",
      description: "成長の庭は研究と重複する永続的なステータスボーナスを提供します。"
    },
    settings: {
      title: "ゲーム設定",
      subtitle: "ゲーム体験をカスタマイズ",
      visual: "視覚設定",
      colorblind: "色覚異常モード",
      colorblindDesc: "より良い視認性のための強化されたコントラストとパターン",
      darkMode: "ダークモード",
      darkModeDesc: "ダーク/ライトテーマの切り替え",
      language: "言語",
      notifications: "通知",
      notificationsDesc: "ゲーム通知とアラート",
      languageNote: "🌍 ゲームインターフェースの希望言語を選択してください。",
      autoSaved: "設定はデバイスに自動保存されます。"
    },
    common: {
      close: "閉じる",
      cancel: "キャンセル",
      confirm: "確認",
      save: "保存",
      loading: "読み込み中...",
      error: "エラー",
      success: "成功",
      level: "レベル",
      experience: "経験値",
      skillPoints: "スキルポイント",
      accuracy: "正確性",
      total: "合計",
      progress: "進行",
      unlocked: "解除済み",
      locked: "ロック中",
      claimed: "獲得済み",
      available: "利用可能",
      max: "最大",
      upgrade: "アップグレード",
      sell: "売却",
      equip: "装備",
      equipped: "装備中"
    }
  },

  ko: {
    welcome: {
      title: "🏰 휴고랜드에 오신 것을 환영합니다! 🗡️",
      subtitle: "지식이 가장 강력한 무기가 되는 궁극의 판타지 어드벤처 게임!",
      features: [
        "퀴즈 문제에 답하여 적을 물리치세요",
        "강력한 무기와 방어구를 수집하세요",
        "보석을 채굴하고 희귀한 반짝이는 보석을 찾으세요",
        "업적을 해제하고 지식 연속 기록을 쌓으세요",
        "다양한 게임 모드와 도전을 탐험하세요",
        "무한한 모험 구역을 진행하세요",
        "요제프 마켓에서 고대 유물을 발견하세요",
        "레벨업하고 강력한 스킬을 해제하세요",
        "일일 보상과 오프라인 진행을 획득하세요",
        "성장의 정원에서 식물을 기르세요"
      ],
      startButton: "모험 시작하기",
      footer: "휴고랜드의 마법 세계에서 여행을 시작하세요"
    },
    nav: {
      hero: "영웅",
      research: "연구",
      shop: "상점",
      inventory: "인벤토리",
      mining: "채굴",
      menu: "메뉴",
      back: "게임으로 돌아가기"
    },
    combat: {
      zone: "구역",
      streak: "지식 연속 기록!",
      streakBonus: "보상 보너스",
      correctAnswers: "연속 정답",
      timeLeft: "초",
      revivalAvailable: "부활 가능",
      revivalReady: "💖 부활 준비 완료",
      correct: "🎉 정답! 데미지를 입혔습니다!",
      wrong: "❌ 오답! 적이 당신을 공격합니다!",
      dealDamage: "정답을 맞춰 데미지를 입히세요!",
      answerCorrectly: "정답을 맞춰서",
      secondsToAnswer: "답할 시간은 {time}초입니다!",
      freeRevival: "💖 걱정하지 마세요 - 죽으면 무료로 한 번 부활할 수 있습니다!"
    },
    stats: {
      heroStatus: "영웅 상태",
      characterLevel: "캐릭터 레벨",
      health: "체력",
      attack: "공격력",
      defense: "방어력",
      currentZone: "현재 구역",
      coins: "코인",
      gems: "보석",
      shiny: "반짝이는",
      startAdventure: "모험 시작",
      defeated: "당신이 패배했습니다!",
      noLives: "남은 생명이 없습니다!",
      changeMode: "게임 모드를 변경하거나 리셋하여 계속하세요!",
      getBetter: "상점에서 더 나은 장비를 구입하고 다시 시도하세요!",
      premiumUnlocked: "🎉 프리미엄 멤버 해제! 🎉",
      premiumMember: "👑 프리미엄 멤버",
      premiumDescription: "구역 50에 도달했습니다! 독점 보상과 특별 기능을 즐기세요!"
    },
    garden: {
      title: "성장의 정원",
      subtitle: "식물을 기르며 영구적인 스탯 보너스를 얻으세요",
      plantSeed: "첫 번째 씨앗 심기",
      howItWorks: "작동 방식:",
      features: [
        "심기 비용은 {cost}코인 (일회성)",
        "성장 1cm = 모든 스탯(ATK, DEF, HP)에 +5% 보너스",
        "오프라인 중에도 자동으로 성장",
        "계속 성장하려면 물을 주어야 함",
        "물은 24시간당 {waterCost}코인",
        "최대 성장: {maxGrowth}cm (+{maxBonus}% 보너스!)"
      ],
      yourCoins: "보유 코인:",
      notEnough: "코인이 부족합니다",
      growthStage: "성장",
      statBonus: "스탯 보너스",
      water: "물",
      remaining: "남은",
      growthProgress: "성장 진행도",
      waterLow: "물이 부족합니다!",
      waterLowDesc: "물이 떨어지면 식물 성장이 멈춥니다.",
      buyWater: "물 구매",
      cost: "비용:",
      buyWaterButton: "물 구매 ({label})",
      tip: "💡 당신의 식물은 게임을 하지 않을 때도 실시간으로 성장합니다!",
      description: "성장의 정원은 연구와 중첩되는 영구적인 스탯 보너스를 제공합니다."
    },
    settings: {
      title: "게임 설정",
      subtitle: "게임 경험을 사용자 정의하세요",
      visual: "시각 설정",
      colorblind: "색맹 모드",
      colorblindDesc: "더 나은 가시성을 위한 향상된 대비와 패턴",
      darkMode: "다크 모드",
      darkModeDesc: "다크/라이트 테마 전환",
      language: "언어",
      notifications: "알림",
      notificationsDesc: "게임 알림 및 경고",
      languageNote: "🌍 게임 인터페이스의 선호 언어를 선택하세요.",
      autoSaved: "설정이 기기에 자동 저장됩니다."
    },
    common: {
      close: "닫기",
      cancel: "취소",
      confirm: "확인",
      save: "저장",
      loading: "로딩 중...",
      error: "오류",
      success: "성공",
      level: "레벨",
      experience: "경험치",
      skillPoints: "스킬 포인트",
      accuracy: "정확도",
      total: "총합",
      progress: "진행",
      unlocked: "해제됨",
      locked: "잠김",
      claimed: "획득함",
      available: "사용 가능",
      max: "최대",
      upgrade: "업그레이드",
      sell: "판매",
      equip: "장착",
      equipped: "장착됨"
    }
  },

  zh: {
    welcome: {
      title: "🏰 欢迎来到雨果兰！ 🗡️",
      subtitle: "知识是你最强武器的终极奇幻冒险游戏！",
      features: [
        "回答问答题来击败敌人",
        "收集强大的武器和护甲",
        "挖掘宝石并找到稀有的闪亮宝石",
        "解锁成就并建立知识连击",
        "探索多种游戏模式和挑战",
        "在无限的冒险区域中前进",
        "在约杰夫市场发现古代遗物",
        "升级并解锁强大技能",
        "获得每日奖励和离线进度",
        "在成长花园中种植植物"
      ],
      startButton: "开始你的冒险",
      footer: "在雨果兰的魔法世界中开始你的旅程"
    },
    nav: {
      hero: "英雄",
      research: "研究",
      shop: "商店",
      inventory: "背包",
      mining: "挖掘",
      menu: "菜单",
      back: "返回游戏"
    },
    combat: {
      zone: "区域",
      streak: "知识连击！",
      streakBonus: "奖励加成",
      correctAnswers: "连续正确答案",
      timeLeft: "秒",
      revivalAvailable: "复活可用",
      revivalReady: "💖 复活准备就绪",
      correct: "🎉 正确！你造成了伤害！",
      wrong: "❌ 错误！敌人攻击了你！",
      dealDamage: "正确回答以造成伤害！",
      answerCorrectly: "正确回答以",
      secondsToAnswer: "你有{time}秒时间回答！",
      freeRevival: "💖 别担心 - 如果你死了可以免费复活一次！"
    },
    stats: {
      heroStatus: "英雄状态",
      characterLevel: "角色等级",
      health: "生命值",
      attack: "攻击力",
      defense: "防御力",
      currentZone: "当前区域",
      coins: "金币",
      gems: "宝石",
      shiny: "闪亮",
      startAdventure: "开始冒险",
      defeated: "你被击败了！",
      noLives: "没有剩余生命！",
      changeMode: "更改游戏模式或重置以继续！",
      getBetter: "访问商店获得更好的装备并重试！",
      premiumUnlocked: "🎉 高级会员已解锁！ 🎉",
      premiumMember: "👑 高级会员",
      premiumDescription: "你已到达第50区域！享受独家奖励和特殊功能！"
    },
    garden: {
      title: "成长花园",
      subtitle: "种植植物获得永久属性加成",
      plantSeed: "种植你的第一颗种子",
      howItWorks: "工作原理：",
      features: [
        "种植费用{cost}金币（一次性）",
        "每厘米成长 = 所有属性（攻击、防御、生命）+5%加成",
        "即使离线也会自动成长",
        "必须保持浇水才能继续成长",
        "水费每24小时{waterCost}金币",
        "最大成长：{maxGrowth}厘米（+{maxBonus}%加成！）"
      ],
      yourCoins: "你的金币：",
      notEnough: "金币不足",
      growthStage: "成长",
      statBonus: "属性加成",
      water: "水",
      remaining: "剩余",
      growthProgress: "成长进度",
      waterLow: "水量不足！",
      waterLowDesc: "水用完时你的植物将停止成长。",
      buyWater: "购买水",
      cost: "费用：",
      buyWaterButton: "购买水（{label}）",
      tip: "💡 你的植物即使在你不玩游戏时也会实时成长！",
      description: "成长花园提供与研究叠加的永久属性加成。"
    },
    settings: {
      title: "游戏设置",
      subtitle: "自定义你的游戏体验",
      visual: "视觉设置",
      colorblind: "色盲模式",
      colorblindDesc: "增强对比度和图案以提高可见性",
      darkMode: "暗黑模式",
      darkModeDesc: "切换暗黑/明亮主题",
      language: "语言",
      notifications: "通知",
      notificationsDesc: "游戏通知和警报",
      languageNote: "🌍 选择游戏界面的首选语言。",
      autoSaved: "设置会自动保存到你的设备。"
    },
    common: {
      close: "关闭",
      cancel: "取消",
      confirm: "确认",
      save: "保存",
      loading: "加载中...",
      error: "错误",
      success: "成功",
      level: "等级",
      experience: "经验",
      skillPoints: "技能点",
      accuracy: "准确率",
      total: "总计",
      progress: "进度",
      unlocked: "已解锁",
      locked: "已锁定",
      claimed: "已领取",
      available: "可用",
      max: "最大",
      upgrade: "升级",
      sell: "出售",
      equip: "装备",
      equipped: "已装备"
    }
  }
};

export const getTranslation = (language: string): Translation => {
  return translations[language] || translations.en;
};

export const t = (language: string, key: string, params?: Record<string, any>): string => {
  const translation = getTranslation(language);
  const keys = key.split('.');
  let value: any = translation;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value !== 'string') {
    return key; // Return key if translation not found
  }
  
  // Replace parameters in the string
  if (params) {
    return value.replace(/\{(\w+)\}/g, (match: string, paramKey: string) => {
      return params[paramKey]?.toString() || match;
    });
  }
  
  return value;
};