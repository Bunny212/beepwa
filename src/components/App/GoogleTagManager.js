export const analytics = (w, d, s, l, i) => {
    // Initialize the dataLayer array if it doesn't already exist
    (w.dataLayer = w.dataLayer || []).push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    // Determine if a custom dataLayer name is used
    const dl = l !== 'dataLayer' ? '&l=' + l : '';
    const scr = `https://load.ss.beesline.com/dacexklm.js?st=${i}${dl}`;

    // Check if the script already exists to avoid multiple installations
    if (!scriptExists(scr)) {
        const j = d.createElement(s);
        j.async = true;
        j.src = scr;
        d.head.appendChild(j);  // Append script to the head
    }
};

// Function to check if the script already exists in the document
const scriptExists = (url) => {
    const scripts = document.getElementsByTagName('script');
    for (let i = scripts.length; i--;) {
        if (scripts[i].src === url) return true;
    }
    return false;
};
