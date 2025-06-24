// components/IainJournalButton.js
import Image from 'next/image';
import styles from '../styles/IainJournalButton.module.css';
import journalIcon from '../public/png-transparent-book-navigation-bar-2710704786.png';

export default function IainJournalButton({ onClick }) {
    return (
        <button className={styles.journalButton} onClick={onClick}>
            <Image src={journalIcon} alt="Journal de bord" width={64} height={64}  />
            <h3 className="text-center neon-glow text-gray-800 dark:text-white">J.D.B.</h3>
        </button>
    );
}