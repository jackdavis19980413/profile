
interface NavBtn {
    id: string,         // (e.g.) btn_aboutme
    label: string,      // (e.g.) ABOUT ME
    selector: string    // (e.g.) #about_me
}

interface NavBottomBtn {
    id: string,     // (e.g.) btn_contactme
    href: string,   // (e.g.) 'mailto:lima.ariel97@gmail.com'
    label: string,  // (e.g.) CONTACT ME
}

export interface Page {
    navbtns: NavBtn[],
    navbottombtns: NavBottomBtn[]
}
