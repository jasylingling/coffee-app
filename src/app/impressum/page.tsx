import Header from '@/components/header/header';
import { FC } from 'react';

const ImpressumPage: FC = () => {
  return (
    <>
      <Header>Impressum</Header>
      <p>
        <b>Verantwortliche Instanz:</b>
        <br />
        Jasmin Fischli
        <br />
        Musterstrasse 123
        <br />
        1234 Muster
        <br />
        Schweiz
        <br />
        <strong>E-Mail</strong>: info@boorista.coffee
        <br />
        <br />
        <strong>Haftungsausschluss</strong>
        <br />
        Der Autor übernimmt keine Gewähr für die Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit
        der Informationen.
        <br />
        Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, die aus dem Zugriff oder der
        Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische
        Störungen entstanden sind, werden ausgeschlossen.
        <br />
        <br />
        Alle Angebote sind freibleibend. Der Autor behält es sich ausdrücklich vor, Teile der Seiten oder das gesamte Angebot
        ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu löschen oder die Veröffentlichung zeitweise oder endgültig
        einzustellen.
        <br />
        <br />
        <strong>Haftungsausschluss für Inhalte und Links</strong>
        <br />
        Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche
        Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene
        Gefahr des jeweiligen Nutzers.
        <br />
        <br />
        <strong>Urheberrechtserklärung</strong>
        <br />
        Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website, gehören
        ausschliesslich Jasmin Fischli oder den speziell genannten Rechteinhabern. Für die Reproduktion jeglicher Elemente
        ist die schriftliche Zustimmung des Urheberrechtsträgers im Voraus einzuholen.
        <br />
        <br />
        <strong>Quelle</strong>:{' '}
        <a href="https://brainbox.swiss/" target="_blank" rel="noopener noreferrer">
          BrainBox Solutions
        </a>
      </p>
    </>
  );
};

export default ImpressumPage;
