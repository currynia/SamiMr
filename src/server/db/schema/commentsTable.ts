import type { IDatabase } from "pg-promise";

export function createCommentsTableIfNotExists(db: IDatabase<unknown>) {
  return db.none(` CREATE TABLE IF NOT EXISTS Comments (
    commentId INT,
    parentPost INT NOT NULL,
    parentComment INT,
    body TEXT NOT NULL,
    authorId INT NOT NULL,
    date DATE NOT NULL,
    FOREIGN KEY (parentPost) REFERENCES Posts(id),
    FOREIGN KEY (parentPost,parentComment) REFERENCES Comments(parentPost,commentId),
    FOREIGN KEY (authorId) REFERENCES Users(id),
    PRIMARY KEY (commentId, parentPost)
  );`);
}
