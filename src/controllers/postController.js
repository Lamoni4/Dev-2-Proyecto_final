const pool = require('../config/db')

/* Obtener todas las publicaciones */
const getAllPosts = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM posts');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Crear una nueva publicación */
const createPost = async (req, res) => {
  const { user_id, title, content } = req.body;

  if (!user_id || !title || !content) {
    return res.status(400).json({ message: 'User ID, title, and content are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
      [user_id, title, content, ]
    );
    res.status(201).json({
      id: result[0].insertId,
      user_id,
      title,
      content
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Actualizar una publicación */
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { user_id, title, content, category } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE posts SET title = ?, content = ?, WHERE id = ? AND user_id = ?',
      [title, content, category, postId, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found or not authorized' });
    }

    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* Eliminar una publicación */
const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { user_id } = req.body;

  try {
    const [result] = await pool.query('DELETE FROM posts WHERE id = ? AND user_id = ?', [postId, user_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Post not found or not authorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost
};
