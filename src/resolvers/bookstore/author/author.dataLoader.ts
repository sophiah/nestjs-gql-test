import * as DataLoader from 'dataloader';
import { lastValueFrom, take } from 'rxjs';
import { Author } from 'src/gql/bookstoreDO';
import { mapFromArray } from 'src/utils';
import { AuthorService } from './author.service';

export function authorDataLoader(authorService: AuthorService) {
  return new DataLoader<string, Author>(async function (ids: string[]) {

    const authorList: Author[] = await lastValueFrom(
      authorService.getAuthors(ids).pipe(take(1)),
    );

    const _idMap = mapFromArray(
      authorList.map((x) => <Author>x),
      (x) => x.id,
    );
    return ids.map((id) => _idMap[id]);
  });
}
