export type Category = 'strand'|'tura'|'regeszet'|'varos'|'kultura'|'barlang'|'gasztro'|'kilato';
export type Poi = { id:string; name:string; lat:number; lon:number; cat:Category; day?:number; note:string };
export type Base = { id:string; name:string; lat:number; lon:number; from:number; to:number };

export const BASES: Base[] = [
 {id:'kolymvari',name:'Kolymvari',lat:35.542,lon:23.779,from:1,to:3},
 {id:'sfakion',name:'Chora Sfakion',lat:35.199,lon:24.137,from:4,to:6},
 {id:'selakano',name:'Selakano',lat:35.093,lon:25.544,from:7,to:8},
 {id:'sitia',name:'Sitia / Papoura',lat:35.209,lon:26.105,from:9,to:11},
 {id:'rethymno',name:'Rethymno',lat:35.369,lon:24.473,from:12,to:14}
];

export const POIS: Poi[] = [
 {id:'chania',name:'Chania óváros',lat:35.516,lon:24.018,cat:'varos',day:1,note:'Velencei kikötő és óvárosi séta'},
 {id:'balos',name:'Balos Lagoon',lat:35.592,lon:23.592,cat:'strand',day:2,note:'Lagúna és strand'},
 {id:'gramvousa',name:'Gramvousa',lat:35.613,lon:23.584,cat:'regeszet',day:2,note:'Sziget és velencei erőd'},
 {id:'falasarna',name:'Falasarna',lat:35.500,lon:23.583,cat:'strand',day:3,note:'Hosszú homokos strand'},
 {id:'polyrinia',name:'Polyrinia',lat:35.463,lon:23.654,cat:'regeszet',day:3,note:'Ókori város és panoráma'},
 {id:'milia',name:'Milia Mountain Retreat',lat:35.430,lon:23.717,cat:'gasztro',note:'Hegyi település és étkezés'},
 {id:'vamos',name:'Vamos',lat:35.407,lon:24.194,cat:'varos',note:'Hagyományos apokoroni falu'},
 {id:'kournas',name:'Kournas-tó',lat:35.330,lon:24.275,cat:'tura',note:'Édesvizű tó, könnyű séta'},
 {id:'therisso',name:'Therisso-szurdok',lat:35.436,lon:23.938,cat:'tura',note:'Szurdok és hegyi környezet'},
 {id:'stavros',name:'Stavros',lat:35.588,lon:24.091,cat:'strand',note:'Védett öböl az Akrotirin'},
 {id:'seitan',name:'Seitan Limania',lat:35.592,lon:24.167,cat:'strand',note:'Látványos, meredek öböl'},
 {id:'elafonissi',name:'Elafonissi',lat:35.271,lon:23.539,cat:'strand',day:4,note:'Sekély, rózsaszínes homok'},
 {id:'kedrodasos',name:'Kedrodasos',lat:35.263,lon:23.537,cat:'strand',day:4,note:'Csendesebb partszakasz'},
 {id:'loutro',name:'Loutro',lat:35.199,lon:24.078,cat:'varos',day:5,note:'Autómentes tengerparti falu'},
 {id:'glykanera',name:'Glyka Nera',lat:35.203,lon:24.095,cat:'strand',day:5,note:'Édesvízű parti öböl'},
 {id:'loutrowalk',name:'Loutro parti séta',lat:35.195,lon:24.073,cat:'tura',day:5,note:'Parti gyaloglás'},
 {id:'samaria',name:'Samaria-szurdok',lat:35.311,lon:23.922,cat:'tura',day:6,note:'Egész napos szurdoktúra'},
 {id:'imbros',name:'Imbros-szurdok',lat:35.213,lon:24.174,cat:'tura',day:6,note:'Rövidebb szurdokalterna­tíva'},
 {id:'aradena',name:'Aradena-szurdok',lat:35.190,lon:24.055,cat:'tura',note:'Vad hegyi szurdok'},
 {id:'frango',name:'Frangokastello',lat:35.182,lon:24.231,cat:'regeszet',note:'Velencei erőd'},
 {id:'kourtaliotiko',name:'Kourtaliotiko-szurdok',lat:35.180,lon:24.462,cat:'tura',day:7,note:'Szurdok és vízesések'},
 {id:'preveli',name:'Preveli Beach',lat:35.151,lon:24.476,cat:'strand',day:7,note:'Pálmaliget és folyótorkolat'},
 {id:'triopetra',name:'Triopetra',lat:35.119,lon:24.538,cat:'strand',note:'Három szikla és déli strand'},
 {id:'plakias',name:'Plakias',lat:35.194,lon:24.394,cat:'strand',note:'Déli parti város és öblök'},
 {id:'spili',name:'Spili',lat:35.202,lon:24.535,cat:'varos',note:'Oroszlános szökőkút, hegyi falu'},
 {id:'zaros',name:'Zaros-tó',lat:35.132,lon:24.903,cat:'tura',note:'Tó és sétaút'},
 {id:'gortyna',name:'Gortyna',lat:35.063,lon:24.947,cat:'regeszet',note:'Görög-római város'},
 {id:'phaistos',name:'Phaistos',lat:35.051,lon:24.813,cat:'regeszet',note:'Mínószi palotaközpont'},
 {id:'matala',name:'Matala',lat:34.993,lon:24.749,cat:'strand',note:'Barlangok és öböl'},
 {id:'agfarm',name:'Agiofarago',lat:34.974,lon:24.772,cat:'tura',note:'Vad szurdok a déli partig'},
 {id:'knossos',name:'Knósszosz',lat:35.298,lon:25.163,cat:'regeszet',note:'Mínószi palotaközpont'},
 {id:'heraklionmuseum',name:'Heraklioni Régészeti Múzeum',lat:35.340,lon:25.133,cat:'regeszet',note:'Mínószi gyűjtemény'},
 {id:'heraklion',name:'Heraklion óváros',lat:35.340,lon:25.130,cat:'varos',note:'Velencei falak és óváros'},
 {id:'archanes',name:'Archanes',lat:35.234,lon:25.161,cat:'varos',note:'Hagyományos falu és borvidék'},
 {id:'agpelagia',name:'Agia Pelagia',lat:35.405,lon:25.013,cat:'strand',note:'Északi öböl'},
 {id:'fodele',name:'Fodele',lat:35.401,lon:24.950,cat:'varos',note:'Hegyi falu'},
 {id:'rethymno',name:'Rethymno óváros',lat:35.369,lon:24.473,cat:'varos',day:12,note:'Velencei kikötő és óváros'},
 {id:'fortezza',name:'Fortezza',lat:35.374,lon:24.471,cat:'regeszet',note:'Velencei erőd'},
 {id:'arkadi',name:'Arkadi kolostor',lat:35.241,lon:24.629,cat:'kultura',day:13,note:'Történelmi kolostor'},
 {id:'eleftherna',name:'Eleftherna',lat:35.343,lon:24.630,cat:'regeszet',day:13,note:'Ókori város és múzeum'},
 {id:'margarites',name:'Margarites',lat:35.344,lon:24.688,cat:'varos',day:13,note:'Hagyományos fazekasfalu'},
 {id:'melidoni',name:'Melidoni-barlang',lat:35.366,lon:24.735,cat:'barlang',note:'Történelmi cseppkőbarlang'},
 {id:'anogeia',name:'Anogeia',lat:35.290,lon:24.884,cat:'varos',note:'Zene, pásztorkultúra, hegyi falu'},
 {id:'nida',name:'Nida-fennsík',lat:35.215,lon:24.779,cat:'kilato',note:'Psiloritis magashegyi fennsík'},
 {id:'kritsa',name:'Kritsa',lat:35.163,lon:25.646,cat:'varos',day:8,note:'Hegyi falu'},
 {id:'panagiakera',name:'Panagia Kera',lat:35.164,lon:25.648,cat:'kultura',day:8,note:'Bizánci freskók'},
 {id:'lato',name:'Lato',lat:35.180,lon:25.650,cat:'regeszet',day:8,note:'Ókori város'},
 {id:'lassithi',name:'Lassithi-fennsík',lat:35.186,lon:25.487,cat:'kilato',day:8,note:'Hegyi fennsík és falvak'},
 {id:'dikteon',name:'Dikteon-barlang',lat:35.163,lon:25.454,cat:'barlang',day:8,note:'Zeuszhoz kötött barlang'},
 {id:'agiosnik',name:'Agios Nikolaos',lat:35.191,lon:25.713,cat:'varos',day:12,note:'Voulismeni-tó és kikötő'},
 {id:'sitia',name:'Sitia',lat:35.209,lon:26.105,cat:'varos',note:'Kelet-krétai kikötőváros'},
 {id:'toplou',name:'Toplou kolostor',lat:35.257,lon:26.261,cat:'kultura',day:10,note:'Történelmi kolostor'},
 {id:'vai',name:'Vai pálmaerdő',lat:35.255,lon:26.262,cat:'strand',day:10,note:'Pálmaerdő és tengerpart'},
 {id:'itanos',name:'Itanos',lat:35.271,lon:26.270,cat:'regeszet',day:10,note:'Ókori tengerparti város'},
 {id:'palaikastro',name:'Palaikastro',lat:35.197,lon:26.265,cat:'regeszet',note:'Mínószi régészeti terület'},
 {id:'zakros',name:'Zakros-palota',lat:35.096,lon:26.262,cat:'regeszet',day:11,note:'Mínószi palota'},
 {id:'valleydead',name:'Halottak völgye',lat:35.094,lon:26.264,cat:'tura',day:11,note:'Zakrosi szurdokvölgy'},
 {id:'spinalonga',name:'Spinalonga',lat:35.293,lon:25.738,cat:'regeszet',day:12,note:'Erődített sziget'},
 {id:'chaniaairport',name:'Chania repülőtér',lat:35.531,lon:24.150,cat:'varos',day:14,note:'Hazautazás vége'}
];

export function baseForDay(day:number): Base { return BASES.find(b=>day>=b.from&&day<=b.to) ?? BASES[0]; }
export function haversineKm(a:{lat:number,lon:number},b:{lat:number,lon:number}):number { const R=6371; const p=Math.PI/180; const x=(b.lat-a.lat)*p, y=(b.lon-a.lon)*p; const q=Math.sin(x/2)**2+Math.cos(a.lat*p)*Math.cos(b.lat*p)*Math.sin(y/2)**2; return 2*R*Math.asin(Math.sqrt(q)); }
export const CAT_LABEL:Record<Category,string>={strand:'🏖️ Strand',tura:'🥾 Túra',regeszet:'🏛️ Régészet',varos:'🏘️ Város/falu',kultura:'⛪ Kultúra',barlang:'🪨 Barlang',gasztro:'🍷 Gasztro',kilato:'🏔️ Kilátó'};
