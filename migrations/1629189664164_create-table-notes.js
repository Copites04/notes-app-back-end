/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('notes', {
    id: {
      type: 'VARCHAR(50)',
      primary_key: true,
    },
    title: {
      type: 'TEXT',
      notNull: true,
    },
    body: {
      type: 'TEXT',
      notNull: true,
    },
    tags: {
      type: 'TEXT[]',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    update_at: {
      type: 'TEXT',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('notes');
};