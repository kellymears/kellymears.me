/**
 * The editorial layer over the Steam import.
 *
 * Playtime measures something, but it is not the same thing as having loved a
 * game. A competitive shooter left running for six years outranks a twelve-hour
 * game that changed how you think. This file is where judgment goes; the
 * importer supplies the spine.
 *
 * Add an appid to `LOVED` to promote a game onto the page. The note is what the
 * game did, in your words — one or two sentences, no summary of the premise.
 * Until this list is populated, the page falls back to ranking by hours.
 */

export interface LovedGame {
  /** Steam appid — the number in the store URL. */
  appid: number
  /** Why it stuck. Optional; the game still gets promoted without one. */
  note?: string
}

export const LOVED: LovedGame[] = []

/**
 * Apps the type and genre rules in `lib/games.ts` cannot catch. A delisted app
 * carries neither a store type nor genres, so anything that left the store has
 * to be excluded by hand or it defaults through as a game.
 */
export const NOT_A_GAME: number[] = [
  214850, // GameMaker: Studio — 709h of making, not playing; delisted
  269570, // GTGD S1 More Than A Gamer — tutorial course; delisted
  292350, // GTGD S2 Learn Unity 2D — tutorial course; delisted
]
