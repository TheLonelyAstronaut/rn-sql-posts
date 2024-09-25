// 1. Create tables

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  passwordHash TEXT NOT NULL,
  avatar TEXT NOT NULL,
  CONSTRAINT uc_users UNIQUE (username,email)
);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY NOT NULL,
  content TEXT NOT NULL,
  author_id TEXT NOT NULL,
  date INTEGER NOT NULL,
  FOREIGN KEY (author_id) REFERENCES users (id)
);

// 2. Check if user exists and all data fields are matching
SELECT id, username, email FROM users WHERE username='test' OR email='test';

// 2.1 If exists, check if paswword hash match
SELECT id, username, email, avatar  FROM users WHERE username='test' AND passwordHash='test' AND email='test';

// 2.2 If not, create user
INSERT INTO users (id, email, username, passwordHash, avatar) VALUES ('second_user', 'test1', 'test1', 'test1', 'test1');

// 2.3 If exists but not matched, throw error

// 3. Select threads and their direct children count
SELECT
    parent.id AS node_id,
    COUNT(child.id) AS children_count
FROM
    comments AS parent
LEFT JOIN
    comments AS child
ON
    child.id LIKE parent.id || '.%'  -- Дети узлов имеют id, начинающиеся с id родительского узла + "."
    AND (LENGTH(child.id) - LENGTH(REPLACE(child.id, '.', ''))) = (LENGTH(parent.id) - LENGTH(REPLACE(parent.id, '.', '')) + 1)
    -- Считаем количество точек: у ребенка должно быть на одну точку больше
GROUP BY
    parent.id
ORDER BY
    parent.id;

// 3. Get data from db
// Starting from parsing first part of index, cause top-level comments sould be ordered by desc
SELECT * FROM comments ORDER BY SUBSTRING(id, 1, INSTR(id, '.') OR LENGTH(id)) DESC LIMIT 25 OFFSET 0;

// Unique count
SELECT COUNT(DISTINCT(SUBSTRING(id, 1, INSTR(id, '.') OR LENGTH(id)))) as total FROM comments;

// Create comment
INSERT INTO comments (id, content, author_id, date) VALUES ('1', 'test', 'first_user', 0)

// NEW APPROACH: working with data without tree nodes count
SELECT *
FROM comments
ORDER BY
    LENGTH(id) - LENGTH(REPLACE(id, '.', '')) ASC,  -- Сортировка по уровню вложенности (корневые узлы первыми)
    id DESC                                         -- Сортировка по убыванию внутри каждого уровня
LIMIT $limit                                            -- Количество строк на странице (например, 10)
OFFSET $offset;                                          -- Пропуск первых 20 строк (например, для страницы 3)
