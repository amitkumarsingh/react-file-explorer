import styles from "./page.module.css";
import Directory from "@/app/components/Directory";
import files from '@/app/files.json'

 const  Home : React.FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Directory files={files} />
      </div>
    </main>
  );
}

export default Home;
