export const CREATE_COMMENTS_TABLE = `
  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    author_id TEXT NOT NULL,
    date INTEGER NOT NULL,
    level_1 INTEGER,
    FOREIGN KEY (author_id) REFERENCES users (id)
  );
`;

export const TABLE_METADATA = "PRAGMA table_info(comments);";

export const ADD_LEVEL_COLUMN =
  "ALTER TABLE comments ADD COLUMN level_% INTEGER DEFAULT null;";

export const COUNT_TREE_NODES = `
  SELECT
      parent.id AS node_id,
      COUNT(child.id) AS children_count
  FROM
      comments AS parent
  LEFT JOIN
      comments AS child
  ON
      child.id LIKE parent.id || '.%'
      AND (LENGTH(child.id) - LENGTH(REPLACE(child.id, '.', ''))) = (LENGTH(parent.id) - LENGTH(REPLACE(parent.id, '.', '')) + 1)
  GROUP BY
      parent.id
  ORDER BY
      parent.id;
`;

export const CREATE_COMMENT = `INSERT INTO comments (id, content, author_id, date,%) VALUES ($id, $content, $author_id, $date,#);`;

export const SELECT_COMMENTS = `
  SELECT
    c.id,
    c.content,
    c.date,
    u.username,
    u.email,
    u.avatar,
    u.id AS user_id
  FROM
    comments c
  LEFT JOIN
    users u
  ON
    c.author_id = u.id
  ORDER BY
    %
  LIMIT $limit
  OFFSET $offset;
`;

/*
SELECT
    c.id,
    c.content,
    c.date,
    u.username,
    u.email,
    u.avatar,
    u.id AS user_id
FROM
    comments c
LEFT JOIN
    users u
ON
    c.author_id = u.id
ORDER BY
    LENGTH(c.id) - LENGTH(REPLACE(c.id, '.', '')),
    CAST(SUBSTR(c.id, 1, INSTR(c.id || '.', '.') - 1) AS INTEGER),
    CASE
        WHEN INSTR(c.id, '.') > 0 THEN CAST(SUBSTR(c.id, INSTR(c.id, '.') + 1,
            INSTR(c.id || '.', '.', INSTR(c.id, '.') + 1) - INSTR(c.id, '.') - 1) AS INTEGER)
        ELSE NULL END,
    CASE
        WHEN LENGTH(c.id) - LENGTH(REPLACE(c.id, '.', '')) > 1 THEN
            CAST(SUBSTR(c.id, INSTR(c.id, '.', INSTR(c.id, '.') + 1) + 1) AS INTEGER)
        ELSE NULL END
LIMIT $limit
OFFSET $offset;
*/
