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
