exports.createUserTabelQuery = `CREATE TABLE IF NOT EXISTS users (
                                                        userId VARCHAR(255)  NOT NULL, 
                                                        userName VARCHAR(255), 
                                                        password VARCHAR(255), 
                                                        accessToken VARCHAR(255),
                                                        refreshToken VARCHAR(255),
                                                        joinedAt TIMESTAMP,
                                                        PRIMARY KEY (userId)
                                                    )`;
