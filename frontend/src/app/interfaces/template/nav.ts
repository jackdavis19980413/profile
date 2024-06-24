interface Citation {
    caption: string,    // (e.g.) "Stay hungry, stay foolish."
    author: string      // (e.g.) Steve Jobs
}

interface Social {
    href: string,   // social link  (e.g.) https://www.linkedin.com/in/jackdavis/
    alt: string,    // social name  (e.g.) LinkedIn
    src: string,    // image path   (e.g.) assets/img/linkedin.png
}

export interface Nav {
    name: string,
    picture: string, // image path
    citation: Citation,
    socials: Social[]
}
