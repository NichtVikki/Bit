const Discord = require('discord.js');

module.exports = {
    aliases: ['roast'],
    category: "Help",
    callback: ({ message }) => {
        const messages = [
            "if you had a chance to be with your one and only, you would probably pick your mother.",
            "If I throw a stick, will you leave?", "You’re a gray sprinkle on a rainbow cupcake.",
            "If your brain was dynamite, there wouldn’t be enough to blow your hat off.",
            "You are more disappointing than an unsalted pretzel.",
            "Light travels faster than sound, which is why you seemed bright until you spoke.",
            "You have so many gaps in your teeth it looks like your tongue is in jail.",
            "Your secrets are always safe with me. I never even listen when you tell me them.",
            "I’ll never forget the first time we met. But I’ll keep trying.",
            "I forgot the world revolves around you. My apologies! How silly of me.",
            "Hold still. I’m trying to imagine you with a personality.",
            "Your face makes onions cry.",
            "I’m not a nerd, I’m just smarter than you.",
            "Don’t be ashamed of who you are. That’s your parent's job.",
            "Your face is just fine, but we’ll have to put a bag over that personality.",
            "You bring everyone so much joy… when you leave the room.",
            "I thought of you today. It reminded me to take out the trash.",
            "Don’t worry about me. Worry about your eyebrows.",
            "You are the human version of period cramps.",
            "You are like a cloud. When you disappear, it’s a beautiful day.",
            "I love what you’ve done with your hair. How do you get it to come out of your nostrils like that?",
            "OH MY GOD! IT SPEAKS!",
            "Don’t get bitter, just get better.",
            "Child, I’ve forgotten more than you ever knew.",
            "You just might be why the middle finger was invented in the first place.",
            "When you look in the mirror, say hi to the clown you see in there for me, would ya?",
            "Complete this sentence for me: “I never want to see you ____!”",
            "Wow, your maker really didn’t waste time giving you a personality, huh?",
            "Someday you’ll go far… and I really hope you stay there.",
            "Oops, my bad. I could’ve sworn I was dealing with an adult.",
            "Somewhere out there is a tree tirelessly producing oxygen for you. You owe it an apology.",
            "Yeah? Well, you smell like hot dog water.",
            "Beauty is only skin deep, but ugly goes clean to the bone.",
            "Well, the jerk store called. They’re running out of you.",
            "I’m busy right now; can I ignore you another time?"
        ]

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];

        message.lineReply(randomMessage)
    }
}