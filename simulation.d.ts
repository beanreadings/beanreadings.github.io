/* tslint:disable */
/* eslint-disable */
/**
*/
export enum ErrorCode {
  InvalidParameters = 0,
  Overflow = 1,
  Other = 2,
}
/**
*/
export class AgeGenerator {
  free(): void;
/**
* @param {number} median_age
*/
  constructor(median_age: number);
/**
* @param {number} median_age
*/
  update_median_age(median_age: number): void;
/**
* @returns {number}
*/
  generate_age(): number;
/**
*/
  median_age: number;
}
/**
*/
export class Bean {
  free(): void;
/**
* @param {Settings} context
* @param {AgeGenerator} age_gen
*/
  constructor(context: Settings, age_gen: AgeGenerator);
/**
* @returns {number}
*/
  get_age(): number;
/**
* @returns {Factors}
*/
  get_factors(): Factors;
/**
* @param {Settings} context
* @returns {boolean}
*/
  dies(context: Settings): boolean;
}
/**
* Beans each have a set of factors, along with "global facotrs", that are shared among all beans,
* such as a global food shortage factor.
*/
export class Factors {
  free(): void;
/**
* @param {boolean} alcoholism
* @param {boolean} binge_drinker
* @param {boolean} smokes_weed
* @param {boolean} smokes_cigarettes
* @param {boolean} smokes_vape
* @param {boolean} consumes_hard_drugs
* @param {Sugar} sugar
* @param {Salt} salt
* @param {Fat} fat
* @param {Vitamins} vitamins
* @param {Wealth} wealth
*/
  constructor(alcoholism: boolean, binge_drinker: boolean, smokes_weed: boolean, smokes_cigarettes: boolean, smokes_vape: boolean, consumes_hard_drugs: boolean, sugar: Sugar, salt: Salt, fat: Fat, vitamins: Vitamins, wealth: Wealth);
/**
*/
  alcoholism: boolean;
/**
*/
  binge_drinker: boolean;
/**
*/
  consumes_hard_drugs: boolean;
/**
*/
  fat: Fat;
/**
*/
  salt: Salt;
/**
*/
  smokes_cigarettes: boolean;
/**
*/
  smokes_vape: boolean;
/**
*/
  smokes_weed: boolean;
/**
*/
  sugar: Sugar;
/**
*/
  vitamins: Vitamins;
/**
*/
  wealth: Wealth;
}
/**
*/
export class Fat {
  free(): void;
/**
*/
  value: number;
}
/**
* This uses a Normal Distribution to generate ages, which may be less relatistic more faster
* because we care about speed.
*/
export class LegacyAgeGenerator {
  free(): void;
/**
* @param {number} median_age
*/
  constructor(median_age: number);
/**
* @returns {number}
*/
  generate_age(): number;
/**
*/
  median_age: number;
}
/**
*/
export class NormalDistribution {
  free(): void;
/**
* @param {number} mean
* @param {number} standard_deviation
*/
  constructor(mean: number, standard_deviation: number);
/**
* @param {number} x
* @returns {number}
*/
  pdf(x: number): number;
/**
* @param {number} x
* @returns {number}
*/
  cdf(x: number): number;
/**
* @param {number} x
* @returns {number}
*/
  quartile(x: number): number;
}
/**
*/
export class Salt {
  free(): void;
/**
*/
  value: number;
}
/**
*/
export class Settings {
  free(): void;
/**
*/
  constructor();
/**
* @param {number} population
*/
  set_population(population: number): void;
/**
* @param {number} max_age
*/
  set_max_age(max_age: number): void;
/**
* @param {number} smokers
*/
  set_smokers(smokers: number): void;
/**
* @param {number} weed_smokers
*/
  set_weed_smokers(weed_smokers: number): void;
/**
* @param {number} vapers
*/
  set_vapers(vapers: number): void;
/**
* @param {number} drinkers
*/
  set_drinkers(drinkers: number): void;
/**
* @param {number} sugar
*/
  set_sugar(sugar: number): void;
/**
* @param {number} salt
*/
  set_salt(salt: number): void;
/**
* @param {number} fat
*/
  set_fat(fat: number): void;
/**
* @param {number} vitamins
*/
  set_vitamins(vitamins: number): void;
/**
* @param {number} wealth_factor
*/
  set_wealth_factor(wealth_factor: number): void;
/**
* @param {number} hard_drugger
*/
  set_hard_drugger(hard_drugger: number): void;
/**
* @param {number} years
*/
  set_years(years: number): void;
/**
*/
  drinkers: number;
/**
*/
  fat: number;
/**
*/
  hard_drugger: number;
/**
*/
  max_age: number;
/**
*/
  population: number;
/**
*/
  salt: number;
/**
*/
  smokers: number;
/**
*/
  sugar: number;
/**
*/
  vapers: number;
/**
*/
  vitamins: number;
/**
*/
  wealth_factor: number;
/**
*/
  weed_smokers: number;
/**
*/
  years: number;
}
/**
*/
export class Simulation {
  free(): void;
/**
* @param {Settings} config
*/
  constructor(config: Settings);
/**
* @returns {SimulationResult}
*/
  long(): SimulationResult;
/**
*/
  settings: Settings;
}
/**
*/
export class SimulationResult {
  free(): void;
/**
* @returns {number}
*/
  get_population(): number;
/**
* @returns {Uint32Array}
*/
  get_population_curve(): Uint32Array;
/**
* @param {number} population
* @param {Uint32Array} population_curve
*/
  constructor(population: number, population_curve: Uint32Array);
/**
*/
  population: number;
}
/**
*/
export class Sugar {
  free(): void;
/**
*/
  value: number;
}
/**
*/
export class Vitamins {
  free(): void;
/**
*/
  value: number;
}
/**
*/
export class Wealth {
  free(): void;
/**
*/
  value: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_agegenerator_free: (a: number) => void;
  readonly __wbg_get_agegenerator_median_age: (a: number) => number;
  readonly __wbg_set_agegenerator_median_age: (a: number, b: number) => void;
  readonly agegenerator_new: (a: number) => number;
  readonly agegenerator_generate_age: (a: number) => number;
  readonly __wbg_legacyagegenerator_free: (a: number) => void;
  readonly legacyagegenerator_new: (a: number) => number;
  readonly legacyagegenerator_generate_age: (a: number) => number;
  readonly __wbg_normaldistribution_free: (a: number) => void;
  readonly normaldistribution_new: (a: number, b: number) => number;
  readonly normaldistribution_pdf: (a: number, b: number) => number;
  readonly normaldistribution_cdf: (a: number, b: number) => number;
  readonly normaldistribution_quartile: (a: number, b: number) => number;
  readonly __wbg_get_legacyagegenerator_median_age: (a: number) => number;
  readonly agegenerator_update_median_age: (a: number, b: number) => void;
  readonly __wbg_set_legacyagegenerator_median_age: (a: number, b: number) => void;
  readonly __wbg_bean_free: (a: number) => void;
  readonly bean_new: (a: number, b: number) => number;
  readonly bean_get_age: (a: number) => number;
  readonly bean_get_factors: (a: number) => number;
  readonly bean_dies: (a: number, b: number) => number;
  readonly __wbg_get_simulation_settings: (a: number) => number;
  readonly __wbg_set_simulation_settings: (a: number, b: number) => void;
  readonly simulation_new: (a: number) => number;
  readonly __wbg_simulationresult_free: (a: number) => void;
  readonly __wbg_get_simulationresult_population: (a: number) => number;
  readonly __wbg_set_simulationresult_population: (a: number, b: number) => void;
  readonly simulationresult_get_population_curve: (a: number, b: number) => void;
  readonly simulationresult_new: (a: number, b: number, c: number) => number;
  readonly __wbg_settings_free: (a: number) => void;
  readonly __wbg_get_settings_years: (a: number) => number;
  readonly __wbg_set_settings_years: (a: number, b: number) => void;
  readonly __wbg_get_settings_population: (a: number) => number;
  readonly __wbg_set_settings_population: (a: number, b: number) => void;
  readonly __wbg_get_settings_max_age: (a: number) => number;
  readonly __wbg_set_settings_max_age: (a: number, b: number) => void;
  readonly __wbg_get_settings_smokers: (a: number) => number;
  readonly __wbg_set_settings_smokers: (a: number, b: number) => void;
  readonly __wbg_get_settings_weed_smokers: (a: number) => number;
  readonly __wbg_set_settings_weed_smokers: (a: number, b: number) => void;
  readonly __wbg_get_settings_vapers: (a: number) => number;
  readonly __wbg_set_settings_vapers: (a: number, b: number) => void;
  readonly __wbg_get_settings_drinkers: (a: number) => number;
  readonly __wbg_set_settings_drinkers: (a: number, b: number) => void;
  readonly __wbg_get_settings_hard_drugger: (a: number) => number;
  readonly __wbg_set_settings_hard_drugger: (a: number, b: number) => void;
  readonly __wbg_get_settings_sugar: (a: number) => number;
  readonly __wbg_set_settings_sugar: (a: number, b: number) => void;
  readonly __wbg_get_settings_salt: (a: number) => number;
  readonly __wbg_set_settings_salt: (a: number, b: number) => void;
  readonly __wbg_get_settings_fat: (a: number) => number;
  readonly __wbg_set_settings_fat: (a: number, b: number) => void;
  readonly __wbg_get_settings_vitamins: (a: number) => number;
  readonly __wbg_set_settings_vitamins: (a: number, b: number) => void;
  readonly __wbg_get_settings_wealth_factor: (a: number) => number;
  readonly __wbg_set_settings_wealth_factor: (a: number, b: number) => void;
  readonly settings_new: () => number;
  readonly simulationresult_get_population: (a: number) => number;
  readonly settings_set_population: (a: number, b: number) => void;
  readonly settings_set_max_age: (a: number, b: number) => void;
  readonly settings_set_smokers: (a: number, b: number) => void;
  readonly settings_set_weed_smokers: (a: number, b: number) => void;
  readonly settings_set_vapers: (a: number, b: number) => void;
  readonly settings_set_drinkers: (a: number, b: number) => void;
  readonly settings_set_sugar: (a: number, b: number) => void;
  readonly settings_set_salt: (a: number, b: number) => void;
  readonly settings_set_fat: (a: number, b: number) => void;
  readonly settings_set_vitamins: (a: number, b: number) => void;
  readonly settings_set_wealth_factor: (a: number, b: number) => void;
  readonly settings_set_hard_drugger: (a: number, b: number) => void;
  readonly settings_set_years: (a: number, b: number) => void;
  readonly __wbg_simulation_free: (a: number) => void;
  readonly __wbg_fat_free: (a: number) => void;
  readonly __wbg_get_fat_value: (a: number) => number;
  readonly __wbg_set_fat_value: (a: number, b: number) => void;
  readonly __wbg_factors_free: (a: number) => void;
  readonly __wbg_get_factors_alcoholism: (a: number) => number;
  readonly __wbg_set_factors_alcoholism: (a: number, b: number) => void;
  readonly __wbg_get_factors_binge_drinker: (a: number) => number;
  readonly __wbg_set_factors_binge_drinker: (a: number, b: number) => void;
  readonly __wbg_get_factors_smokes_weed: (a: number) => number;
  readonly __wbg_set_factors_smokes_weed: (a: number, b: number) => void;
  readonly __wbg_get_factors_smokes_cigarettes: (a: number) => number;
  readonly __wbg_set_factors_smokes_cigarettes: (a: number, b: number) => void;
  readonly __wbg_get_factors_smokes_vape: (a: number) => number;
  readonly __wbg_set_factors_smokes_vape: (a: number, b: number) => void;
  readonly __wbg_get_factors_consumes_hard_drugs: (a: number) => number;
  readonly __wbg_set_factors_consumes_hard_drugs: (a: number, b: number) => void;
  readonly __wbg_get_factors_sugar: (a: number) => number;
  readonly __wbg_set_factors_sugar: (a: number, b: number) => void;
  readonly __wbg_get_factors_salt: (a: number) => number;
  readonly __wbg_set_factors_salt: (a: number, b: number) => void;
  readonly __wbg_get_factors_fat: (a: number) => number;
  readonly __wbg_set_factors_fat: (a: number, b: number) => void;
  readonly __wbg_get_factors_vitamins: (a: number) => number;
  readonly __wbg_set_factors_vitamins: (a: number, b: number) => void;
  readonly __wbg_get_factors_wealth: (a: number) => number;
  readonly __wbg_set_factors_wealth: (a: number, b: number) => void;
  readonly factors_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => number;
  readonly __wbg_get_sugar_value: (a: number) => number;
  readonly __wbg_get_salt_value: (a: number) => number;
  readonly __wbg_get_vitamins_value: (a: number) => number;
  readonly __wbg_get_wealth_value: (a: number) => number;
  readonly __wbg_set_sugar_value: (a: number, b: number) => void;
  readonly __wbg_set_salt_value: (a: number, b: number) => void;
  readonly __wbg_set_vitamins_value: (a: number, b: number) => void;
  readonly __wbg_set_wealth_value: (a: number, b: number) => void;
  readonly __wbg_sugar_free: (a: number) => void;
  readonly __wbg_salt_free: (a: number) => void;
  readonly __wbg_vitamins_free: (a: number) => void;
  readonly __wbg_wealth_free: (a: number) => void;
  readonly simulation_long: (a: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
