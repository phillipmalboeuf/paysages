import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeArticleFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    date?: EntryFieldTypes.Date;
    media?: EntryFieldTypes.AssetLink;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;

export function isTypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeArticle<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'article'
}

export interface TypeCarteFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    googleMapId: EntryFieldTypes.Symbol;
}

export type TypeCarteSkeleton = EntrySkeletonType<TypeCarteFields, "carte">;
export type TypeCarte<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCarteSkeleton, Modifiers, Locales>;

export function isTypeCarte<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCarte<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'carte'
}

export interface TypeEventFields {
    titre?: EntryFieldTypes.Symbol;
    id: EntryFieldTypes.Symbol;
    date?: EntryFieldTypes.Date;
    endroit?: EntryFieldTypes.Text;
    image?: EntryFieldTypes.AssetLink;
    focus?: EntryFieldTypes.Object;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
}

export type TypeEventSkeleton = EntrySkeletonType<TypeEventFields, "event">;
export type TypeEvent<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeEventSkeleton, Modifiers, Locales>;

export function isTypeEvent<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeEvent<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'event'
}

export interface TypeFormulaireFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    action?: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    bouton?: EntryFieldTypes.Symbol;
    remerciment?: EntryFieldTypes.Symbol;
    champs?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeInputSkeleton>>;
}

export type TypeFormulaireSkeleton = EntrySkeletonType<TypeFormulaireFields, "formulaire">;
export type TypeFormulaire<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeFormulaireSkeleton, Modifiers, Locales>;

export function isTypeFormulaire<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeFormulaire<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'formulaire'
}

export interface TypeHeroFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    alignement?: EntryFieldTypes.Symbol<"Droite" | "Gauche">;
    image?: EntryFieldTypes.AssetLink;
    focus?: EntryFieldTypes.Object<{ focalPoint: { x: number, y: number } }>;
}

export type TypeHeroSkeleton = EntrySkeletonType<TypeHeroFields, "hero">;
export type TypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeHeroSkeleton, Modifiers, Locales>;

export function isTypeHero<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeHero<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'hero'
}

export interface TypeImageFocusedFields {
    title: EntryFieldTypes.Symbol;
    image: EntryFieldTypes.AssetLink;
    focalPoint: EntryFieldTypes.Object;
}

export type TypeImageFocusedSkeleton = EntrySkeletonType<TypeImageFocusedFields, "imageFocused">;
export type TypeImageFocused<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeImageFocusedSkeleton, Modifiers, Locales>;

export function isTypeImageFocused<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeImageFocused<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'imageFocused'
}

export interface TypeInputFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    type?: EntryFieldTypes.Symbol<"Email" | "Options" | "Phone" | "Text" | "Textarea">;
    options?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
}

export type TypeInputSkeleton = EntrySkeletonType<TypeInputFields, "input">;
export type TypeInput<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeInputSkeleton, Modifiers, Locales>;

export function isTypeInput<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeInput<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'input'
}

export interface TypeLienDeNavigationFields {
    titre: EntryFieldTypes.Symbol;
    route?: EntryFieldTypes.Symbol;
    externe?: EntryFieldTypes.Boolean;
    cta?: EntryFieldTypes.Symbol;
}

export type TypeLienDeNavigationSkeleton = EntrySkeletonType<TypeLienDeNavigationFields, "lienDeNavigation">;
export type TypeLienDeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeLienDeNavigationSkeleton, Modifiers, Locales>;

export function isTypeLienDeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLienDeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'lienDeNavigation'
}

export interface TypeListeFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    corps?: EntryFieldTypes.RichText;
    sousTitre?: EntryFieldTypes.Symbol;
    type?: EntryFieldTypes.Symbol<"Accordeon" | "Colonnes" | "Slider" | "Tableau">;
    fond?: EntryFieldTypes.Symbol<"Blanc" | "Foncé" | "Léger">;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeImageFocusedSkeleton | TypeTextSkeleton | TypeLienDeNavigationSkeleton | TypeEventSkeleton>>;
}

export type TypeListeSkeleton = EntrySkeletonType<TypeListeFields, "liste">;
export type TypeListe<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeListeSkeleton, Modifiers, Locales>;

export function isTypeListe<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeListe<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'liste'
}

export interface TypeNavigationFields {
    id?: EntryFieldTypes.Symbol;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}

export interface TypePageFields {
    titre?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    image?: EntryFieldTypes.AssetLink;
    focus?: EntryFieldTypes.Object<{ focalPoint: { x: number, y: number } }>;
    couleur?: EntryFieldTypes.Symbol<"bleu" | "corail" | "gris" | "jaune" | "vert">;
    contenu?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCarteSkeleton | TypeFormulaireSkeleton | TypeHeroSkeleton | TypeListeSkeleton | TypeTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypeTextFields {
    title?: EntryFieldTypes.Symbol;
    id?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    focus?: EntryFieldTypes.Object<{ focalPoint: { x: number, y: number } }>;
    fond?: EntryFieldTypes.Symbol<"Blanc" | "Foncé" | "Léger">;
    alignement?: EntryFieldTypes.Symbol<"Droite" | "Gauche">;
    alignementParagraph?: EntryFieldTypes.Symbol<"Droite" | "Gauche">;
    grosTitre?: EntryFieldTypes.Boolean;
    corps?: EntryFieldTypes.RichText;
    liens?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeLienDeNavigationSkeleton>>;
}

export type TypeTextSkeleton = EntrySkeletonType<TypeTextFields, "text">;
export type TypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTextSkeleton, Modifiers, Locales>;

export function isTypeText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'text'
}
