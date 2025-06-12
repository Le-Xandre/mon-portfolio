import Gauge from '../components/Gauge';
import { getAssetPath } from '../lib/assets'; // ✅ Ajout


export default function About() {
  return (
      <section className="py-10 max-w-6xl mx-auto dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-extrabold text-center mb-8 neon-glow text-gray-900 dark:text-whites">À propos de moi</h2>
              {/* Ajout du gauge */}
              <div className="flex justify-center mt-4">
                  <Gauge theme="steampunk" /></div>
              
              <p className="mt-6 text-lg text-gray-700 text-center dark:text-gray-300">
                  Ayant un passif en Histoire de l'art mais aussi en Arts Plastiques,
                  <br></br>mes compétences incluent la création de concepts visuels & d'illustrations.
                  <br></br>
                  <br></br>Je suis également un développeur passionné par les technologies web modernes.
                  <br></br>J'aime créer des interfaces utilisateur élégantes, performantes et accessibles.
                  
              </p>

      </div>
    </section>
  );
}
