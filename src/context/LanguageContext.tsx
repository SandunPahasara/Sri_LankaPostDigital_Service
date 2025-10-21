import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'si' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.aboutUs': 'About Us',
    'nav.services': 'Services',
    'nav.information': 'Information',
    'nav.mediaGallery': 'Media Gallery',
    'nav.notice': 'Notice',
    'nav.contactUs': 'Contact Us',
    'nav.siteMap': 'Site Map',
    'nav.trackParcel': 'Track Parcel',
    'nav.dashboard': 'Dashboard',
    'nav.pickupRequest': 'Pickup Request',
    'nav.signIn': 'Sign In',
    'nav.signUp': 'Sign Up',
    'nav.signOut': 'Sign Out',
    
    // Department Name
    'dept.name': 'Department of Posts - Sri Lanka',
    
    // Home Page
    'home.hero.title': 'Sri Lanka Post Digital Services',
    'home.hero.subtitle': 'Modernizing postal services with cutting-edge technology while preserving the trust and reliability you\'ve known for over 200 years.',
    'home.hero.cta': 'Explore Our Services',
    
    // Services
    'services.title': 'Our Services',
    'services.trackTrace': 'Track & Trace',
    'services.trackTrace.desc': 'Real-time tracking for all your parcels and letters with instant notifications and detailed delivery updates.',
    'services.digitalLetter': 'Digital Letter Scanning',
    'services.digitalLetter.desc': 'Preserve your precious old letters digitally. We scan and deliver them securely to your email or mobile device.',
    'services.smartDelivery': 'Smart Delivery Options',
    'services.smartDelivery.desc': 'Schedule deliveries at your convenience or redirect packages to your nearest post office branch.',
    'services.secureNotifications': 'Secure Notifications',
    'services.secureNotifications.desc': 'Stay informed with SMS and email alerts about your deliveries, delays, and important updates.',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.getInTouch': 'Get in Touch',
    'contact.description': 'Get in touch with our customer service team. We\'re here to help with any questions about our services or your deliveries.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.category': 'Category',
    'contact.submit': 'Send Message',
    'contact.thankYou': 'Thank You!',
    'contact.received': 'Your message has been received. Our customer service team will respond to you within 24 hours.',
    'contact.sendAnother': 'Send Another Message',
    'contact.callUs': 'Call Us',
    'contact.hotline': 'Hotline',
    'contact.emailUs': 'Email Us',
    'contact.visitUs': 'Visit Us',
    'contact.address': 'Address',
    'contact.workingHours': 'Working Hours',
    
    // About
    'about.title': 'About Sri Lanka Post',
    'about.subtitle': 'Over 200 years of trusted service',
    'about.description': 'Sri Lanka Post has been serving the nation since 1798, connecting people and communities across the island.',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.history': 'Our History',
    
    // Track Parcel
    'track.title': 'Track Your Parcel',
    'track.subtitle': 'Enter your tracking number to see the current status of your shipment',
    'track.trackingNumber': 'Tracking Number',
    'track.enterTracking': 'Enter tracking number',
    'track.track': 'Track',
    'track.status': 'Status',
    'track.location': 'Location',
    'track.date': 'Date',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome',
    'dashboard.overview': 'Overview',
    'dashboard.recentActivity': 'Recent Activity',
    
    // Pickup Request
    'pickup.title': 'Request Pickup',
    'pickup.subtitle': 'Schedule a pickup for your parcel',
    'pickup.parcelDetails': 'Parcel Details',
    'pickup.pickupAddress': 'Pickup Address',
    'pickup.schedulePickup': 'Schedule Pickup',
    
    // Login/Register
    'login.title': 'Sign In',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.rememberMe': 'Remember Me',
    'login.forgotPassword': 'Forgot Password?',
    'login.noAccount': 'Don\'t have an account?',
    'register.title': 'Sign Up',
    'register.firstName': 'First Name',
    'register.lastName': 'Last Name',
    'register.confirmPassword': 'Confirm Password',
    'register.haveAccount': 'Already have an account?',
    
    // Footer
    'footer.about': 'About Sri Lanka Post',
    'footer.quickLinks': 'Quick Links',
    'footer.contact': 'Contact Information',
    'footer.rights': 'All rights reserved.',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  si: {
    // Navbar
    'nav.home': 'මුල් පිටුව',
    'nav.aboutUs': 'අප ගැන',
    'nav.services': 'සේවාවන්',
    'nav.information': 'තොරතුරු',
    'nav.mediaGallery': 'මාධ්‍ය ගැලරිය',
    'nav.notice': 'නිවේදන',
    'nav.contactUs': 'අප අමතන්න',
    'nav.siteMap': 'අඩවි සිතියම',
    'nav.trackParcel': 'පාර්සල් ලුහුබැඳීම',
    'nav.dashboard': 'උපකරණ පුවරුව',
    'nav.pickupRequest': 'රැගෙන යාමේ ඉල්ලීම',
    'nav.signIn': 'ඇතුල් වන්න',
    'nav.signUp': 'ලියාපදිංචි වන්න',
    'nav.signOut': 'පිටවන්න',
    
    // Department Name
    'dept.name': 'ශ්‍රී ලංකා තැපැල් දෙපාර්තමේන්තුව',
    
    // Home Page
    'home.hero.title': 'ශ්‍රී ලංකා තැපැල් ඩිජිටල් සේවා',
    'home.hero.subtitle': 'වසර 200කට වැඩි කාලයක් තිස්සේ ඔබ දන්නා විශ්වාසය සහ විශ්වසනීයත්වය ආරක්ෂා කරමින් අති නවීන තාක්ෂණයෙන් තැපැල් සේවා නවීකරණය කිරීම.',
    'home.hero.cta': 'අපගේ සේවාවන් ගවේෂණය කරන්න',
    
    // Services
    'services.title': 'අපගේ සේවාවන්',
    'services.trackTrace': 'ලුහුබැඳීම සහ සොයාගැනීම',
    'services.trackTrace.desc': 'ඔබගේ සියලුම පාර්සල් සහ ලිපි සඳහා තත්‍ය කාලීන ලුහුබැඳීම සහ විස්තරාත්මක බෙදාහැරීමේ යාවත්කාලීන කිරීම්.',
    'services.digitalLetter': 'ඩිජිටල් ලිපි ස්කෑන් කිරීම',
    'services.digitalLetter.desc': 'ඔබගේ වටිනා පැරණි ලිපි ඩිජිටල් ලෙස ආරක්ෂා කරන්න. අපි ඒවා ස්කෑන් කර ඔබගේ ඊමේල් හෝ ජංගම උපාංගයට ආරක්ෂිතව බෙදා හරිමු.',
    'services.smartDelivery': 'ස්මාර්ට් බෙදාහැරීමේ විකල්ප',
    'services.smartDelivery.desc': 'ඔබගේ පහසුව අනුව බෙදාහැරීම් කාලසටහන්ගත කරන්න හෝ පැකේජ ඔබගේ ආසන්නතම තැපැල් කාර්යාල ශාඛාවට හරවන්න.',
    'services.secureNotifications': 'ආරක්ෂිත දැනුම්දීම්',
    'services.secureNotifications.desc': 'SMS සහ ඊමේල් නිවේදන මගින් ඔබගේ බෙදාහැරීම්, ප්‍රමාදයන් සහ වැදගත් යාවත්කාලීන කිරීම් පිළිබඳව දැනුවත්ව සිටින්න.',
    
    // Contact
    'contact.title': 'අප අමතන්න',
    'contact.getInTouch': 'අප හා සම්බන්ධ වන්න',
    'contact.description': 'අපගේ පාරිභෝගික සේවා කණ්ඩායම හා සම්බන්ධ වන්න. අපගේ සේවාවන් හෝ ඔබගේ බෙදාහැරීම් පිළිබඳ කිසියම් ප්‍රශ්නයකට උදව් කිරීමට අපි මෙහි සිටිමු.',
    'contact.name': 'නම',
    'contact.email': 'ඊමේල්',
    'contact.phone': 'දුරකථන',
    'contact.subject': 'විෂය',
    'contact.message': 'පණිවිඩය',
    'contact.category': 'ප්‍රවර්ගය',
    'contact.submit': 'පණිවිඩය යවන්න',
    'contact.thankYou': 'ඔබට ස්තූතියි!',
    'contact.received': 'ඔබගේ පණිවිඩය ලැබී ඇත. අපගේ පාරිභෝගික සේවා කණ්ඩායම පැය 24ක් ඇතුළත ඔබට ප්‍රතිචාර දක්වනු ඇත.',
    'contact.sendAnother': 'තවත් පණිවිඩයක් යවන්න',
    'contact.callUs': 'අපට ඇමතුමක් දෙන්න',
    'contact.hotline': 'හොට්ලයින්',
    'contact.emailUs': 'අපට ඊමේල් කරන්න',
    'contact.visitUs': 'අපව බලන්න',
    'contact.address': 'ලිපිනය',
    'contact.workingHours': 'වැඩ කරන වේලාවන්',
    
    // About
    'about.title': 'ශ්‍රී ලංකා තැපැල් ගැන',
    'about.subtitle': 'වසර 200කට වැඩි විශ්වාසනීය සේවාව',
    'about.description': 'ශ්‍රී ලංකා තැපැල් 1798 සිට ජාතියට සේවය කරමින්, දිවයින පුරා ජනතාව සහ ප්‍රජාවන් සම්බන්ධ කරමින් සිටී.',
    'about.mission': 'අපගේ මෙහෙවර',
    'about.vision': 'අපගේ දැක්ම',
    'about.history': 'අපගේ ඉතිහාසය',
    
    // Track Parcel
    'track.title': 'ඔබගේ පාර්සලය ලුහුබැඳීම',
    'track.subtitle': 'ඔබේ නැව්ගත කිරීමේ වත්මන් තත්ත්වය බැලීමට ඔබේ ලුහුබැඳීමේ අංකය ඇතුළත් කරන්න',
    'track.trackingNumber': 'ලුහුබැඳීමේ අංකය',
    'track.enterTracking': 'ලුහුබැඳීමේ අංකය ඇතුළත් කරන්න',
    'track.track': 'ලුහුබඳින්න',
    'track.status': 'තත්ත්වය',
    'track.location': 'ස්ථානය',
    'track.date': 'දිනය',
    
    // Dashboard
    'dashboard.title': 'උපකරණ පුවරුව',
    'dashboard.welcome': 'සාදරයෙන් පිළිගනිමු',
    'dashboard.overview': 'දළ විශ්ලේෂණය',
    'dashboard.recentActivity': 'මෑත ක්‍රියාකාරකම්',
    
    // Pickup Request
    'pickup.title': 'රැගෙන යාමේ ඉල්ලීම',
    'pickup.subtitle': 'ඔබගේ පාර්සලය සඳහා රැගෙන යාමක් කාලසටහන් කරන්න',
    'pickup.parcelDetails': 'පාර්සල් විස්තර',
    'pickup.pickupAddress': 'රැගෙන යාමේ ලිපිනය',
    'pickup.schedulePickup': 'රැගෙන යාම කාලසටහන් කරන්න',
    
    // Login/Register
    'login.title': 'ඇතුල් වන්න',
    'login.email': 'ඊමේල් ලිපිනය',
    'login.password': 'මුරපදය',
    'login.rememberMe': 'මාව මතක තබාගන්න',
    'login.forgotPassword': 'මුරපදය අමතක වුණාද?',
    'login.noAccount': 'ගිණුමක් නැද්ද?',
    'register.title': 'ලියාපදිංචි වන්න',
    'register.firstName': 'මුල් නම',
    'register.lastName': 'අවසන් නම',
    'register.confirmPassword': 'මුරපදය තහවුරු කරන්න',
    'register.haveAccount': 'දැනටමත් ගිණුමක් තිබේද?',
    
    // Footer
    'footer.about': 'ශ්‍රී ලංකා තැපැල් ගැන',
    'footer.quickLinks': 'ඉක්මන් සබැඳි',
    'footer.contact': 'සම්බන්ධතා තොරතුරු',
    'footer.rights': 'සියලුම හිමිකම් ඇවිරිණි.',
    
    // Common
    'common.loading': 'පූරණය වෙමින්...',
    'common.error': 'දෝෂය',
    'common.success': 'සාර්ථකයි',
  },
  ta: {
    // Navbar
    'nav.home': 'முகப்பு',
    'nav.aboutUs': 'எங்களை பற்றி',
    'nav.services': 'சேவைகள்',
    'nav.information': 'தகவல்',
    'nav.mediaGallery': 'ஊடக காட்சியகம்',
    'nav.notice': 'அறிவிப்பு',
    'nav.contactUs': 'எங்களை தொடர்பு கொள்ளுங்கள்',
    'nav.siteMap': 'தள வரைபடம்',
    'nav.trackParcel': 'பார்சல் கண்காணிப்பு',
    'nav.dashboard': 'கட்டுப்பாட்டு பலகை',
    'nav.pickupRequest': 'எடுத்துச் செல்லும் கோரிக்கை',
    'nav.signIn': 'உள்நுழைய',
    'nav.signUp': 'பதிவு செய்ய',
    'nav.signOut': 'வெளியேறு',
    
    // Department Name
    'dept.name': 'இலங்கை அஞ்சல் திணைக்களம்',
    
    // Home Page
    'home.hero.title': 'இலங்கை அஞ்சல் டிஜிட்டல் சேவைகள்',
    'home.hero.subtitle': '200 ஆண்டுகளுக்கும் மேலாக நீங்கள் அறிந்த நம்பிக்கை மற்றும் நம்பகத்தன்மையை பாதுகாத்து, அதிநவீன தொழில்நுட்பத்துடன் அஞ்சல் சேவைகளை நவீனப்படுத்துதல்.',
    'home.hero.cta': 'எங்கள் சேவைகளை ஆராயுங்கள்',
    
    // Services
    'services.title': 'எங்கள் சேவைகள்',
    'services.trackTrace': 'கண்காணிப்பு மற்றும் தடமறிதல்',
    'services.trackTrace.desc': 'உங்கள் அனைத்து பார்சல்கள் மற்றும் கடிதங்களுக்கும் உடனடி அறிவிப்புகள் மற்றும் விரிவான விநியோக புதுப்பிப்புகளுடன் நேரடி கண்காணிப்பு.',
    'services.digitalLetter': 'டிஜிட்டல் கடித ஸ்கேனிங்',
    'services.digitalLetter.desc': 'உங்கள் விலைமதிப்பற்ற பழைய கடிதங்களை டிஜிட்டல் முறையில் பாதுகாக்கவும். நாங்கள் அவற்றை ஸ்கேன் செய்து உங்கள் மின்னஞ்சல் அல்லது மொபைல் சாதனத்திற்கு பாதுகாப்பாக வழங்குகிறோம்.',
    'services.smartDelivery': 'ஸ்மார்ட் விநியோக விருப்பங்கள்',
    'services.smartDelivery.desc': 'உங்கள் வசதிக்கு ஏற்ப விநியோகங்களை திட்டமிடவும் அல்லது பார்சல்களை உங்கள் அருகிலுள்ள தபால் நிலையத்திற்கு திருப்பி விடவும்.',
    'services.secureNotifications': 'பாதுகாப்பான அறிவிப்புகள்',
    'services.secureNotifications.desc': 'உங்கள் விநியோகங்கள், தாமதங்கள் மற்றும் முக்கிய புதுப்பிப்புகள் குறித்து SMS மற்றும் மின்னஞ்சல் விழிப்பூட்டல்களுடன் தெரிவிக்கப்படுங்கள்.',
    
    // Contact
    'contact.title': 'எங்களை தொடர்பு கொள்ளுங்கள்',
    'contact.getInTouch': 'தொடர்பில் இருங்கள்',
    'contact.description': 'எங்கள் வாடிக்கையாளர் சேவைக் குழுவுடன் தொடர்பு கொள்ளுங்கள். எங்கள் சேவைகள் அல்லது உங்கள் விநியோகங்கள் பற்றிய கேள்விகளுக்கு உதவ நாங்கள் இங்கே இருக்கிறோம்.',
    'contact.name': 'பெயர்',
    'contact.email': 'மின்னஞ்சல்',
    'contact.phone': 'தொலைபேசி',
    'contact.subject': 'பொருள்',
    'contact.message': 'செய்தி',
    'contact.category': 'வகை',
    'contact.submit': 'செய்தியை அனுப்பவும்',
    'contact.thankYou': 'நன்றி!',
    'contact.received': 'உங்கள் செய்தி பெறப்பட்டது. எங்கள் வாடிக்கையாளர் சேவைக் குழு 24 மணி நேரத்திற்குள் உங்களுக்கு பதிலளிக்கும்.',
    'contact.sendAnother': 'மற்றொரு செய்தியை அனுப்பவும்',
    'contact.callUs': 'எங்களை அழைக்கவும்',
    'contact.hotline': 'ஹாட்லைன்',
    'contact.emailUs': 'எங்களுக்கு மின்னஞ்சல் செய்யவும்',
    'contact.visitUs': 'எங்களைப் பார்வையிடவும்',
    'contact.address': 'முகவரி',
    'contact.workingHours': 'வேலை நேரங்கள்',
    
    // About
    'about.title': 'இலங்கை அஞ்சல் பற்றி',
    'about.subtitle': '200 ஆண்டுகளுக்கும் மேலான நம்பகமான சேவை',
    'about.description': 'இலங்கை அஞ்சல் 1798 முதல் நாட்டிற்கு சேவை செய்து வருகிறது, தீவு முழுவதும் மக்களையும் சமூகங்களையும் இணைக்கிறது.',
    'about.mission': 'எங்கள் நோக்கம்',
    'about.vision': 'எங்கள் பார்வை',
    'about.history': 'எங்கள் வரலாறு',
    
    // Track Parcel
    'track.title': 'உங்கள் பார்சலைக் கண்காணிக்கவும்',
    'track.subtitle': 'உங்கள் ஏற்றுமதியின் தற்போதைய நிலையைப் பார்க்க உங்கள் கண்காணிப்பு எண்ணை உள்ளிடவும்',
    'track.trackingNumber': 'கண்காணிப்பு எண்',
    'track.enterTracking': 'கண்காணிப்பு எண்ணை உள்ளிடவும்',
    'track.track': 'கண்காணி',
    'track.status': 'நிலை',
    'track.location': 'இடம்',
    'track.date': 'தேதி',
    
    // Dashboard
    'dashboard.title': 'கட்டுப்பாட்டு பலகை',
    'dashboard.welcome': 'வரவேற்பு',
    'dashboard.overview': 'மேலோட்டம்',
    'dashboard.recentActivity': 'சமீபத்திய செயல்பாடு',
    
    // Pickup Request
    'pickup.title': 'எடுத்துச் செல்லும் கோரிக்கை',
    'pickup.subtitle': 'உங்கள் பார்சலுக்கு எடுத்துச் செல்லல் திட்டமிடுங்கள்',
    'pickup.parcelDetails': 'பார்சல் விவரங்கள்',
    'pickup.pickupAddress': 'எடுத்துச் செல்லும் முகவரி',
    'pickup.schedulePickup': 'எடுத்துச் செல்லல் திட்டமிடுங்கள்',
    
    // Login/Register
    'login.title': 'உள்நுழைய',
    'login.email': 'மின்னஞ்சல் முகவரி',
    'login.password': 'கடவுச்சொல்',
    'login.rememberMe': 'என்னை நினைவில் கொள்',
    'login.forgotPassword': 'கடவுச்சொல்லை மறந்துவிட்டீர்களா?',
    'login.noAccount': 'கணக்கு இல்லையா?',
    'register.title': 'பதிவு செய்ய',
    'register.firstName': 'முதல் பெயர்',
    'register.lastName': 'கடைசி பெயர்',
    'register.confirmPassword': 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
    'register.haveAccount': 'ஏற்கனவே ஒரு கணக்கு உள்ளதா?',
    
    // Footer
    'footer.about': 'இலங்கை அஞ்சல் பற்றி',
    'footer.quickLinks': 'விரைவு இணைப்புகள்',
    'footer.contact': 'தொடர்பு தகவல்',
    'footer.rights': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    
    // Common
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
