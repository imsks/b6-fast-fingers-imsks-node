exports.createGameTabelQuery = `CREATE TABLE IF NOT EXISTS games (
                                                        gameId VARCHAR(255) NOT NULL,
                                                        userId VARCHAR(255),
                                                        difficulty VARCHAR(255), 
                                                        score VARCHAR(255), 
                                                        scoredAt TIMESTAMP,
                                                        PRIMARY KEY (gameId),
                                                        FOREIGN KEY (userId) REFERENCES users(userId)
                                                    )`;
