
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum TitleType {
    TVSHOW = "TVSHOW",
    MOVIE = "MOVIE"
}

export class QueryTitle {
    titleType: TitleType[];
    count: number;
}

export interface Title {
    tconst: string;
    titleType: string;
    primaryTitle: string;
    originalTitle?: Nullable<string>;
    startYear?: Nullable<number>;
    endYear?: Nullable<number>;
    isAdult?: Nullable<number>;
    runtimeMinutes?: Nullable<string>;
    genres?: Nullable<Nullable<string>[]>;
    principles?: Nullable<Nullable<Principles>[]>;
    crews?: Nullable<Nullable<Crew>[]>;
}

export class Principles {
    tconst: string;
    nconst: string;
    ordering?: Nullable<number>;
    category?: Nullable<string>;
    job?: Nullable<string>;
    characters?: Nullable<Nullable<string>[]>;
}

export class Crew {
    nconst: string;
    primaryName: string;
    birthYear?: Nullable<number>;
    deathYear?: Nullable<number>;
    primaryProfession?: Nullable<Nullable<string>[]>;
    knownForTitles?: Nullable<Nullable<string>[]>;
}

export class Movie implements Title {
    tconst: string;
    titleType: string;
    primaryTitle: string;
    originalTitle?: Nullable<string>;
    startYear?: Nullable<number>;
    endYear?: Nullable<number>;
    isAdult?: Nullable<number>;
    runtimeMinutes?: Nullable<string>;
    genres?: Nullable<Nullable<string>[]>;
    principles?: Nullable<Nullable<Principles>[]>;
    crews?: Nullable<Nullable<Crew>[]>;
}

export class TvEpisode implements Title {
    tconst: string;
    titleType: string;
    primaryTitle: string;
    originalTitle?: Nullable<string>;
    startYear?: Nullable<number>;
    endYear?: Nullable<number>;
    isAdult?: Nullable<number>;
    runtimeMinutes?: Nullable<string>;
    genres?: Nullable<Nullable<string>[]>;
    principles?: Nullable<Nullable<Principles>[]>;
    crews?: Nullable<Nullable<Crew>[]>;
}

export class Episode {
    tconst: string;
    seasonNumber?: Nullable<string>;
    episodeNumber?: Nullable<string>;
    episodeDetail?: Nullable<TvEpisode>;
}

export class TvSeries implements Title {
    tconst: string;
    titleType: string;
    primaryTitle: string;
    originalTitle?: Nullable<string>;
    startYear?: Nullable<number>;
    endYear?: Nullable<number>;
    isAdult?: Nullable<number>;
    runtimeMinutes?: Nullable<string>;
    genres?: Nullable<Nullable<string>[]>;
    principles?: Nullable<Nullable<Principles>[]>;
    crews?: Nullable<Nullable<Crew>[]>;
    episodes?: Nullable<Nullable<Episode>[]>;
}

export abstract class IQuery {
    abstract queryTitle(query: QueryTitle): Nullable<Nullable<Title>[]> | Promise<Nullable<Nullable<Title>[]>>;
}

type Nullable<T> = T | null;
