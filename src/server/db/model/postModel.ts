import type { CommentDto } from "@root/dto/commentDto";
import type { PostDto } from "@root/dto/postDto";
import type { IDatabase } from "pg-promise";

export const savePostModel = (
  db: IDatabase<unknown>,
  authorId: number,
  title: string,
  body: string,
  dateTime: Date
): Promise<number> => {
  return db.one(
    `
    INSERT INTO posts (author_id, title, body, created_at)
    VALUES ($1, $2, $3, $4) RETURNING id as "postId"
    `,
    [authorId, title, body, dateTime]
  );
};

export const createInsertCommentFunction = (db: IDatabase<unknown>) => {
  db.none(`CREATE OR REPLACE FUNCTION insertComment(_parentPost INTEGER, _parentComment INTEGER, _body TEXT, _authorId INTEGER, _date DATE) RETURNS JSON AS $$
    DECLARE _commentId INTEGER; _result JSON;
    BEGIN

    SELECT COUNT(*) INTO _commentId FROM Comments WHERE Comments.parentPost = _parentPost;
    INSERT INTO Comments(commentId, parentPost, parentComment, body, authorId, date)
    VALUES (_commentId, _parentPost, _parentComment, _body, _authorId, _date)
    RETURNING row_to_json(Comments) INTO _result;
    RETURN _result;

    END;
    $$ LANGUAGE plpgsql;`);
};

export const saveCommentModel = (
  db: IDatabase<unknown>,
  parentPost: number,
  body: string,
  authorId: number,
  date: Date,
  parentComment?: number
): Promise<CommentDto> => {
  return db.one(
    `
    SELECT insertComment($1, $2, $3, $4, $5);
    `,
    [parentPost, parentComment, body, authorId, date]
  );
};


export function getPostsByTime(db: IDatabase<object>, limit: number): Promise<Array<PostDto>> {
  return db.manyOrNone<PostDto>(`
    SELECT p.id as "postId",
    p.title,
    p.body,
    u.username as "authorName",
    p.created_at as "dateTime" FROM Posts p
    INNER JOIN Users u
    ON u.id = p.author_id
    ORDER BY p.created_at DESC, p.id
    LIMIT $1;`, [limit]);
};

export function getOldPostsAfterId(db: IDatabase<object>, postId: number, dateTime: Date, limit: number): Promise<Array<PostDto>> {
  return db.manyOrNone<PostDto>(`SELECT p.id as "postId",
    p.title,
    p.body,
    u.username as "authorName",
    p.created_at as "dateTime" FROM Posts p
    INNER JOIN Users u
    ON u.id = p.author_id
WHERE p.created_at < $(dateTime) AND p.id < $(postId)
    ORDER BY p.created_at DESC, p.id
    LIMIT $(limit);`, { dateTime, postId, limit });
};

export const createPollTriggerAfterInsertOnPost = (db: IDatabase<object>) => {
  return db.none(`
CREATE OR REPLACE FUNCTION notify_insert() RETURNS TRIGGER AS $$
BEGIN
PERFORM pg_notify($1:: text, NEW.id::text);
RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_insert
AFTER INSERT ON POSTS FOR EACH ROW
EXECUTE FUNCTION notify_insert();
`, ['postchannel']);
};

export function getNewPostsAfterId(db: IDatabase<object>, postId: number, dateTime: Date, limit: number): Promise<Array<PostDto>> {
  return db.manyOrNone<PostDto>(`SELECT p.id as "postId",
    p.title,
    p.body,
    u.username as "authorName",
    p.created_at as "dateTime" FROM Posts p
    INNER JOIN Users u
    ON u.id = p.author_id
WHERE p.created_at > $(dateTime) AND p.id > $(postId)
    ORDER BY p.created_at DESC, p.id
    LIMIT $(limit);`, { dateTime, postId, limit });
};
