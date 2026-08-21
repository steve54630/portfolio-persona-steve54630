/*
 * L'aide clavier doit rester decouvrable en permanence sur desktop : on ne la
 * masque plus au mouvement de la souris. Chaque appelant se charge de la
 * cacher sur mobile (classes `hidden sm:*`), ou le tactile ne concerne pas.
 */
export default function useMouseActivity() {
  return true;
}
