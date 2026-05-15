/** Placeholder data for UI development — replace with API responses in production */

export const analyticsOverview = [
  {
    id: 'queries',
    label: 'Queries This Week',
    value: '247',
    change: '+18%',
    trend: 'up',
    icon: 'chart',
  },
  {
    id: 'accuracy',
    label: 'SQL Accuracy',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: 'check',
  },
  {
    id: 'latency',
    label: 'Avg. Response Time',
    value: '1.2s',
    change: '-0.3s',
    trend: 'up',
    icon: 'clock',
  },
  {
    id: 'saved',
    label: 'Saved Queries',
    value: '38',
    change: '+5',
    trend: 'up',
    icon: 'bookmark',
  },
];

export const recentQueries = [
  {
    id: 'q1',
    title: 'Top customers by revenue',
    naturalLanguage: 'Show me the top 10 customers by total order revenue in 2024',
    sql: 'SELECT c.name, SUM(o.total) AS revenue\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nWHERE EXTRACT(YEAR FROM o.created_at) = 2024\nGROUP BY c.id, c.name\nORDER BY revenue DESC\nLIMIT 10;',
    status: 'success',
    executedAt: '2 min ago',
    rowCount: 10,
  },
  {
    id: 'q2',
    title: 'Monthly active users',
    naturalLanguage: 'How many unique users logged in each month this year?',
    sql: 'SELECT DATE_TRUNC(\'month\', last_login) AS month,\n       COUNT(DISTINCT user_id) AS mau\nFROM user_sessions\nWHERE last_login >= DATE_TRUNC(\'year\', CURRENT_DATE)\nGROUP BY 1\nORDER BY 1;',
    status: 'success',
    executedAt: '15 min ago',
    rowCount: 5,
  },
  {
    id: 'q3',
    title: 'Inventory below threshold',
    naturalLanguage: 'List products with stock quantity less than reorder level',
    sql: 'SELECT p.name, p.sku, i.quantity, p.reorder_level\nFROM products p\nJOIN inventory i ON p.id = i.product_id\nWHERE i.quantity < p.reorder_level\nORDER BY i.quantity ASC;',
    status: 'warning',
    executedAt: '1 hr ago',
    rowCount: 23,
  },
];

export const savedQueries = [
  {
    id: 's1',
    title: 'Weekly revenue report',
    naturalLanguage: 'Total revenue grouped by week for the last 12 weeks',
    sql: 'SELECT DATE_TRUNC(\'week\', created_at) AS week, SUM(total) AS revenue\nFROM orders\nWHERE created_at >= NOW() - INTERVAL \'12 weeks\'\nGROUP BY 1 ORDER BY 1;',
    tags: ['finance', 'weekly'],
    lastRun: 'Yesterday',
  },
  {
    id: 's2',
    title: 'Churn risk customers',
    naturalLanguage: 'Customers with no orders in the last 90 days but had orders before',
    sql: 'SELECT c.* FROM customers c\nWHERE NOT EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n  AND o.created_at > NOW() - INTERVAL \'90 days\'\n)\nAND EXISTS (\n  SELECT 1 FROM orders o WHERE o.customer_id = c.id\n);',
    tags: ['retention'],
    lastRun: '3 days ago',
  },
];

export const queryHistory = [
  {
    id: 'h1',
    title: 'Top customers by revenue',
    naturalLanguage: 'Show me the top 10 customers by total order revenue in 2024',
    sql: 'SELECT c.name, SUM(o.total) AS revenue FROM customers c JOIN orders o ON c.id = o.customer_id WHERE EXTRACT(YEAR FROM o.created_at) = 2024 GROUP BY c.id, c.name ORDER BY revenue DESC LIMIT 10;',
    status: 'success',
    executedAt: '2026-05-14T10:32:00Z',
    duration: '842ms',
    rowCount: 10,
    database: 'Production PostgreSQL',
  },
  {
    id: 'h2',
    title: 'Failed join attempt',
    naturalLanguage: 'Get all user emails from the signup table',
    sql: 'SELECT email FROM signup_users;',
    status: 'error',
    executedAt: '2026-05-14T09:15:00Z',
    duration: '120ms',
    rowCount: 0,
    database: 'Production PostgreSQL',
    error: 'relation "signup_users" does not exist',
  },
  {
    id: 'h3',
    title: 'Product catalog export',
    naturalLanguage: 'List all active products with category and price',
    sql: 'SELECT p.name, c.name AS category, p.price FROM products p JOIN categories c ON p.category_id = c.id WHERE p.is_active = true;',
    status: 'success',
    executedAt: '2026-05-13T16:45:00Z',
    duration: '1.1s',
    rowCount: 156,
    database: 'Staging PostgreSQL',
  },
  {
    id: 'h4',
    title: 'Daily order count',
    naturalLanguage: 'Count orders per day for the last 7 days',
    sql: 'SELECT DATE(created_at) AS day, COUNT(*) FROM orders WHERE created_at >= CURRENT_DATE - 7 GROUP BY 1 ORDER BY 1;',
    status: 'success',
    executedAt: '2026-05-13T11:20:00Z',
    duration: '456ms',
    rowCount: 7,
    database: 'Production PostgreSQL',
  },
];

export const databaseSchema = [
  {
    name: 'customers',
    columns: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'name', type: 'varchar(255)' },
      { name: 'email', type: 'varchar(255)' },
      { name: 'created_at', type: 'timestamp' },
    ],
  },
  {
    name: 'orders',
    columns: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'customer_id', type: 'uuid', fk: 'customers.id' },
      { name: 'total', type: 'decimal(12,2)' },
      { name: 'status', type: 'varchar(50)' },
      { name: 'created_at', type: 'timestamp' },
    ],
  },
  {
    name: 'products',
    columns: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'name', type: 'varchar(255)' },
      { name: 'sku', type: 'varchar(64)' },
      { name: 'price', type: 'decimal(10,2)' },
      { name: 'category_id', type: 'uuid', fk: 'categories.id' },
      { name: 'reorder_level', type: 'integer' },
      { name: 'is_active', type: 'boolean' },
    ],
  },
  {
    name: 'inventory',
    columns: [
      { name: 'product_id', type: 'uuid', pk: true, fk: 'products.id' },
      { name: 'quantity', type: 'integer' },
      { name: 'warehouse_id', type: 'uuid' },
    ],
  },
  {
    name: 'categories',
    columns: [
      { name: 'id', type: 'uuid', pk: true },
      { name: 'name', type: 'varchar(128)' },
    ],
  },
];

export const sampleQueryResult = {
  columns: ['name', 'revenue'],
  rows: [
    { name: 'Acme Corp', revenue: '284,500.00' },
    { name: 'Globex Industries', revenue: '198,320.50' },
    { name: 'Initech LLC', revenue: '156,890.00' },
    { name: 'Umbrella Co', revenue: '142,100.25' },
    { name: 'Stark Enterprises', revenue: '128,450.00' },
    { name: 'Wayne Holdings', revenue: '115,200.75' },
    { name: 'Oscorp Labs', revenue: '98,340.00' },
    { name: 'Cyberdyne Systems', revenue: '87,650.50' },
    { name: 'Massive Dynamic', revenue: '76,220.00' },
    { name: 'Hooli Inc', revenue: '65,890.25' },
  ],
};

export const defaultGeneratedSql = `SELECT c.name, SUM(o.total) AS revenue
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE EXTRACT(YEAR FROM o.created_at) = 2024
GROUP BY c.id, c.name
ORDER BY revenue DESC
LIMIT 10;`;

export const queryExplanation = `This query joins the **customers** and **orders** tables on customer ID, filters orders to the year 2024, aggregates total revenue per customer, and returns the top 10 results sorted by revenue descending.

**Tables used:** customers, orders  
**Aggregations:** SUM(o.total)  
**Filters:** YEAR = 2024`;

export const databaseConnection = {
  name: 'Production PostgreSQL',
  host: 'db.prod.querylens.io',
  status: 'connected',
  latency: '12ms',
  lastSync: '2 min ago',
  tables: 24,
};

export const landingFeatures = [
  {
    title: 'Natural Language to SQL',
    description: 'Describe what you need in plain English. Our AI translates intent into optimized, dialect-aware SQL.',
    icon: 'sparkles',
  },
  {
    title: 'Schema-Aware Generation',
    description: 'Connect your database and let the model understand tables, relationships, and column types.',
    icon: 'database',
  },
  {
    title: 'Explain & Validate',
    description: 'Every query ships with human-readable explanations and safety checks before execution.',
    icon: 'shield',
  },
  {
    title: 'Query History & Analytics',
    description: 'Track performance, accuracy, and team usage with built-in dashboards and audit logs.',
    icon: 'chart',
  },
  {
    title: 'Multi-Database Support',
    description: 'PostgreSQL, MySQL, BigQuery, Snowflake — one interface for all your data sources.',
    icon: 'layers',
  },
  {
    title: 'Collaborative Workspace',
    description: 'Save, share, and version queries with your team in a secure developer-first environment.',
    icon: 'users',
  },
];
