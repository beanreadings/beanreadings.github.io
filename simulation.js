let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

let WASM_VECTOR_LEN = 0;

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
/**
*/
export const ErrorCode = Object.freeze({ InvalidParameters:0,"0":"InvalidParameters",Overflow:1,"1":"Overflow",Other:2,"2":"Other", });

const AgeGeneratorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_agegenerator_free(ptr >>> 0));
/**
*/
export class AgeGenerator {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        AgeGeneratorFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_agegenerator_free(ptr);
    }
    /**
    * @returns {number}
    */
    get median_age() {
        const ret = wasm.__wbg_get_agegenerator_median_age(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set median_age(arg0) {
        wasm.__wbg_set_agegenerator_median_age(this.__wbg_ptr, arg0);
    }
    /**
    * @param {number} median_age
    */
    constructor(median_age) {
        const ret = wasm.agegenerator_new(median_age);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {number} median_age
    */
    update_median_age(median_age) {
        wasm.__wbg_set_agegenerator_median_age(this.__wbg_ptr, median_age);
    }
    /**
    * @returns {number}
    */
    generate_age() {
        const ret = wasm.agegenerator_generate_age(this.__wbg_ptr);
        return ret;
    }
}

const BeanFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_bean_free(ptr >>> 0));
/**
*/
export class Bean {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BeanFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bean_free(ptr);
    }
    /**
    * @param {Settings} context
    * @param {AgeGenerator} age_gen
    */
    constructor(context, age_gen) {
        _assertClass(context, Settings);
        _assertClass(age_gen, AgeGenerator);
        const ret = wasm.bean_new(context.__wbg_ptr, age_gen.__wbg_ptr);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {number}
    */
    get_age() {
        const ret = wasm.bean_get_age(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {Factors}
    */
    get_factors() {
        const ret = wasm.bean_get_factors(this.__wbg_ptr);
        return Factors.__wrap(ret);
    }
    /**
    * @param {Settings} context
    * @returns {boolean}
    */
    dies(context) {
        _assertClass(context, Settings);
        const ret = wasm.bean_dies(this.__wbg_ptr, context.__wbg_ptr);
        return ret !== 0;
    }
}

const FactorsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_factors_free(ptr >>> 0));
/**
* Beans each have a set of factors, along with "global facotrs", that are shared among all beans,
* such as a global food shortage factor.
*/
export class Factors {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Factors.prototype);
        obj.__wbg_ptr = ptr;
        FactorsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FactorsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_factors_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    get alcoholism() {
        const ret = wasm.__wbg_get_factors_alcoholism(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set alcoholism(arg0) {
        wasm.__wbg_set_factors_alcoholism(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get binge_drinker() {
        const ret = wasm.__wbg_get_factors_binge_drinker(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set binge_drinker(arg0) {
        wasm.__wbg_set_factors_binge_drinker(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get smokes_weed() {
        const ret = wasm.__wbg_get_factors_smokes_weed(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set smokes_weed(arg0) {
        wasm.__wbg_set_factors_smokes_weed(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get smokes_cigarettes() {
        const ret = wasm.__wbg_get_factors_smokes_cigarettes(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set smokes_cigarettes(arg0) {
        wasm.__wbg_set_factors_smokes_cigarettes(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get smokes_vape() {
        const ret = wasm.__wbg_get_factors_smokes_vape(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set smokes_vape(arg0) {
        wasm.__wbg_set_factors_smokes_vape(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {boolean}
    */
    get consumes_hard_drugs() {
        const ret = wasm.__wbg_get_factors_consumes_hard_drugs(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set consumes_hard_drugs(arg0) {
        wasm.__wbg_set_factors_consumes_hard_drugs(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {Sugar}
    */
    get sugar() {
        const ret = wasm.__wbg_get_factors_sugar(this.__wbg_ptr);
        return Sugar.__wrap(ret);
    }
    /**
    * @param {Sugar} arg0
    */
    set sugar(arg0) {
        _assertClass(arg0, Sugar);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_factors_sugar(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {Salt}
    */
    get salt() {
        const ret = wasm.__wbg_get_factors_salt(this.__wbg_ptr);
        return Salt.__wrap(ret);
    }
    /**
    * @param {Salt} arg0
    */
    set salt(arg0) {
        _assertClass(arg0, Salt);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_factors_salt(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {Fat}
    */
    get fat() {
        const ret = wasm.__wbg_get_factors_fat(this.__wbg_ptr);
        return Fat.__wrap(ret);
    }
    /**
    * @param {Fat} arg0
    */
    set fat(arg0) {
        _assertClass(arg0, Fat);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_factors_fat(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {Vitamins}
    */
    get vitamins() {
        const ret = wasm.__wbg_get_factors_vitamins(this.__wbg_ptr);
        return Vitamins.__wrap(ret);
    }
    /**
    * @param {Vitamins} arg0
    */
    set vitamins(arg0) {
        _assertClass(arg0, Vitamins);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_factors_vitamins(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {Wealth}
    */
    get wealth() {
        const ret = wasm.__wbg_get_factors_wealth(this.__wbg_ptr);
        return Wealth.__wrap(ret);
    }
    /**
    * @param {Wealth} arg0
    */
    set wealth(arg0) {
        _assertClass(arg0, Wealth);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_factors_wealth(this.__wbg_ptr, ptr0);
    }
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
    constructor(alcoholism, binge_drinker, smokes_weed, smokes_cigarettes, smokes_vape, consumes_hard_drugs, sugar, salt, fat, vitamins, wealth) {
        _assertClass(sugar, Sugar);
        var ptr0 = sugar.__destroy_into_raw();
        _assertClass(salt, Salt);
        var ptr1 = salt.__destroy_into_raw();
        _assertClass(fat, Fat);
        var ptr2 = fat.__destroy_into_raw();
        _assertClass(vitamins, Vitamins);
        var ptr3 = vitamins.__destroy_into_raw();
        _assertClass(wealth, Wealth);
        var ptr4 = wealth.__destroy_into_raw();
        const ret = wasm.factors_new(alcoholism, binge_drinker, smokes_weed, smokes_cigarettes, smokes_vape, consumes_hard_drugs, ptr0, ptr1, ptr2, ptr3, ptr4);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
}

const FatFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_fat_free(ptr >>> 0));
/**
*/
export class Fat {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Fat.prototype);
        obj.__wbg_ptr = ptr;
        FatFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        FatFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_fat_free(ptr);
    }
    /**
    * @returns {number}
    */
    get value() {
        const ret = wasm.__wbg_get_fat_value(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set value(arg0) {
        wasm.__wbg_set_fat_value(this.__wbg_ptr, arg0);
    }
}

const LegacyAgeGeneratorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_legacyagegenerator_free(ptr >>> 0));
/**
* This uses a Normal Distribution to generate ages, which may be less relatistic more faster
* because we care about speed.
*/
export class LegacyAgeGenerator {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LegacyAgeGeneratorFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_legacyagegenerator_free(ptr);
    }
    /**
    * @returns {number}
    */
    get median_age() {
        const ret = wasm.__wbg_get_agegenerator_median_age(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set median_age(arg0) {
        wasm.__wbg_set_agegenerator_median_age(this.__wbg_ptr, arg0);
    }
    /**
    * @param {number} median_age
    */
    constructor(median_age) {
        const ret = wasm.legacyagegenerator_new(median_age);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {number}
    */
    generate_age() {
        const ret = wasm.legacyagegenerator_generate_age(this.__wbg_ptr);
        return ret >>> 0;
    }
}

const NormalDistributionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_normaldistribution_free(ptr >>> 0));
/**
*/
export class NormalDistribution {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        NormalDistributionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_normaldistribution_free(ptr);
    }
    /**
    * @param {number} mean
    * @param {number} standard_deviation
    */
    constructor(mean, standard_deviation) {
        const ret = wasm.normaldistribution_new(mean, standard_deviation);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {number} x
    * @returns {number}
    */
    pdf(x) {
        const ret = wasm.normaldistribution_pdf(this.__wbg_ptr, x);
        return ret;
    }
    /**
    * @param {number} x
    * @returns {number}
    */
    cdf(x) {
        const ret = wasm.normaldistribution_cdf(this.__wbg_ptr, x);
        return ret;
    }
    /**
    * @param {number} x
    * @returns {number}
    */
    quartile(x) {
        const ret = wasm.normaldistribution_quartile(this.__wbg_ptr, x);
        return ret;
    }
}

const SaltFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_salt_free(ptr >>> 0));
/**
*/
export class Salt {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Salt.prototype);
        obj.__wbg_ptr = ptr;
        SaltFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SaltFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_salt_free(ptr);
    }
    /**
    * @returns {number}
    */
    get value() {
        const ret = wasm.__wbg_get_fat_value(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set value(arg0) {
        wasm.__wbg_set_fat_value(this.__wbg_ptr, arg0);
    }
}

const SettingsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_settings_free(ptr >>> 0));
/**
*/
export class Settings {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Settings.prototype);
        obj.__wbg_ptr = ptr;
        SettingsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SettingsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_settings_free(ptr);
    }
    /**
    * @returns {number}
    */
    get years() {
        const ret = wasm.__wbg_get_settings_years(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set years(arg0) {
        wasm.__wbg_set_settings_years(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get population() {
        const ret = wasm.__wbg_get_settings_population(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set population(arg0) {
        wasm.__wbg_set_settings_population(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get max_age() {
        const ret = wasm.__wbg_get_settings_max_age(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set max_age(arg0) {
        wasm.__wbg_set_settings_max_age(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get smokers() {
        const ret = wasm.__wbg_get_settings_smokers(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set smokers(arg0) {
        wasm.__wbg_set_settings_smokers(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get weed_smokers() {
        const ret = wasm.__wbg_get_settings_weed_smokers(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set weed_smokers(arg0) {
        wasm.__wbg_set_settings_weed_smokers(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get vapers() {
        const ret = wasm.__wbg_get_settings_vapers(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set vapers(arg0) {
        wasm.__wbg_set_settings_vapers(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get drinkers() {
        const ret = wasm.__wbg_get_settings_drinkers(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set drinkers(arg0) {
        wasm.__wbg_set_settings_drinkers(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get hard_drugger() {
        const ret = wasm.__wbg_get_settings_hard_drugger(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set hard_drugger(arg0) {
        wasm.__wbg_set_settings_hard_drugger(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get sugar() {
        const ret = wasm.__wbg_get_settings_sugar(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set sugar(arg0) {
        wasm.__wbg_set_settings_sugar(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get salt() {
        const ret = wasm.__wbg_get_settings_salt(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set salt(arg0) {
        wasm.__wbg_set_settings_salt(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get fat() {
        const ret = wasm.__wbg_get_settings_fat(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set fat(arg0) {
        wasm.__wbg_set_settings_fat(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get vitamins() {
        const ret = wasm.__wbg_get_settings_vitamins(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set vitamins(arg0) {
        wasm.__wbg_set_settings_vitamins(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get wealth_factor() {
        const ret = wasm.__wbg_get_settings_wealth_factor(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set wealth_factor(arg0) {
        wasm.__wbg_set_settings_wealth_factor(this.__wbg_ptr, arg0);
    }
    /**
    */
    constructor() {
        const ret = wasm.settings_new();
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {number} population
    */
    set_population(population) {
        wasm.__wbg_set_settings_population(this.__wbg_ptr, population);
    }
    /**
    * @param {number} max_age
    */
    set_max_age(max_age) {
        wasm.__wbg_set_settings_max_age(this.__wbg_ptr, max_age);
    }
    /**
    * @param {number} smokers
    */
    set_smokers(smokers) {
        wasm.__wbg_set_settings_smokers(this.__wbg_ptr, smokers);
    }
    /**
    * @param {number} weed_smokers
    */
    set_weed_smokers(weed_smokers) {
        wasm.__wbg_set_settings_weed_smokers(this.__wbg_ptr, weed_smokers);
    }
    /**
    * @param {number} vapers
    */
    set_vapers(vapers) {
        wasm.__wbg_set_settings_vapers(this.__wbg_ptr, vapers);
    }
    /**
    * @param {number} drinkers
    */
    set_drinkers(drinkers) {
        wasm.__wbg_set_settings_drinkers(this.__wbg_ptr, drinkers);
    }
    /**
    * @param {number} sugar
    */
    set_sugar(sugar) {
        wasm.__wbg_set_settings_sugar(this.__wbg_ptr, sugar);
    }
    /**
    * @param {number} salt
    */
    set_salt(salt) {
        wasm.__wbg_set_settings_salt(this.__wbg_ptr, salt);
    }
    /**
    * @param {number} fat
    */
    set_fat(fat) {
        wasm.__wbg_set_settings_fat(this.__wbg_ptr, fat);
    }
    /**
    * @param {number} vitamins
    */
    set_vitamins(vitamins) {
        wasm.__wbg_set_settings_vitamins(this.__wbg_ptr, vitamins);
    }
    /**
    * @param {number} wealth_factor
    */
    set_wealth_factor(wealth_factor) {
        wasm.__wbg_set_settings_wealth_factor(this.__wbg_ptr, wealth_factor);
    }
    /**
    * @param {number} hard_drugger
    */
    set_hard_drugger(hard_drugger) {
        wasm.__wbg_set_settings_hard_drugger(this.__wbg_ptr, hard_drugger);
    }
    /**
    * @param {number} years
    */
    set_years(years) {
        wasm.__wbg_set_settings_years(this.__wbg_ptr, years);
    }
}

const SimulationFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_simulation_free(ptr >>> 0));
/**
*/
export class Simulation {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SimulationFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_simulation_free(ptr);
    }
    /**
    * @returns {Settings}
    */
    get settings() {
        const ret = wasm.__wbg_get_simulation_settings(this.__wbg_ptr);
        return Settings.__wrap(ret);
    }
    /**
    * @param {Settings} arg0
    */
    set settings(arg0) {
        _assertClass(arg0, Settings);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_simulation_settings(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {Settings} config
    */
    constructor(config) {
        _assertClass(config, Settings);
        var ptr0 = config.__destroy_into_raw();
        const ret = wasm.simulation_new(ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {SimulationResult}
    */
    long() {
        const ret = wasm.simulation_long(this.__wbg_ptr);
        return SimulationResult.__wrap(ret);
    }
}

const SimulationResultFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_simulationresult_free(ptr >>> 0));
/**
*/
export class SimulationResult {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SimulationResult.prototype);
        obj.__wbg_ptr = ptr;
        SimulationResultFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SimulationResultFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_simulationresult_free(ptr);
    }
    /**
    * @returns {number}
    */
    get population() {
        const ret = wasm.__wbg_get_simulationresult_population(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set population(arg0) {
        wasm.__wbg_set_simulationresult_population(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get_population() {
        const ret = wasm.__wbg_get_simulationresult_population(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {Uint32Array}
    */
    get_population_curve() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.simulationresult_get_population_curve(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayU32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} population
    * @param {Uint32Array} population_curve
    */
    constructor(population, population_curve) {
        const ptr0 = passArray32ToWasm0(population_curve, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.simulationresult_new(population, ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
}

const SugarFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_sugar_free(ptr >>> 0));
/**
*/
export class Sugar {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Sugar.prototype);
        obj.__wbg_ptr = ptr;
        SugarFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SugarFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_sugar_free(ptr);
    }
    /**
    * @returns {number}
    */
    get value() {
        const ret = wasm.__wbg_get_fat_value(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set value(arg0) {
        wasm.__wbg_set_fat_value(this.__wbg_ptr, arg0);
    }
}

const VitaminsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vitamins_free(ptr >>> 0));
/**
*/
export class Vitamins {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vitamins.prototype);
        obj.__wbg_ptr = ptr;
        VitaminsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        VitaminsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vitamins_free(ptr);
    }
    /**
    * @returns {number}
    */
    get value() {
        const ret = wasm.__wbg_get_fat_value(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set value(arg0) {
        wasm.__wbg_set_fat_value(this.__wbg_ptr, arg0);
    }
}

const WealthFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wealth_free(ptr >>> 0));
/**
*/
export class Wealth {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Wealth.prototype);
        obj.__wbg_ptr = ptr;
        WealthFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WealthFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wealth_free(ptr);
    }
    /**
    * @returns {number}
    */
    get value() {
        const ret = wasm.__wbg_get_fat_value(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set value(arg0) {
        wasm.__wbg_set_fat_value(this.__wbg_ptr, arg0);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_crypto_566d7465cdbb6b7a = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_process_dc09a8c7d59982f6 = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_d98c6400c6ca2bd8 = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_caaf83d002149bd5 = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbg_require_94a9da52636aacbf = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_msCrypto_0b84745e9245cdf6 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_randomFillSync_290977693942bf03 = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_260cc23a41afad9a = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_newnoargs_e258087cd0daa0ea = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_27c0f87801dedf93 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_ce0dbfc45cf2f5be = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_c6fb939a7f436783 = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_d1e6af4856ba331b = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_207b558942527489 = function() { return handleError(function () {
        const ret = global.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_call_b3ca7c6051f9bec1 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_buffer_12d079cc21e14bdb = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_aa4a17c33a06e5cb = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_63b92bc8671ed464 = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_a47bac70306a19a7 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_newwithlength_e9b4878cebadb3d3 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_a1f73cd4b5b42fe1 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('simulation_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
