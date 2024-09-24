export const CREATE_COMMENTS_TABLE = `
  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY NOT NULL,
    content TEXT NOT NULL,
    author_id TEXT NOT NULL,
    date INTEGER NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users (id)
  );
`;

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

export const CREATE_COMMENT = `INSERT INTO comments (id, content, author_id, date) VALUES ($id, $content, $author_id, $date);`;

export const SELECT_COMMENTS = `SELECT * FROM comments ORDER BY SUBSTRING(id, 1, INSTR(id, '.') OR LENGTH(id)) DESC LIMIT $limit OFFSET $offset;`;
