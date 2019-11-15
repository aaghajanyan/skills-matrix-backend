module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "user",
        {
            email: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: "Please enter email address"
                },
                unique: {
                    args: true,
                    msg: "Email already exists"
                },
                validate: {
                    isEmail: {
                        args: true,
                        msg: "Please enter a valid email address"
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: "Please enter a password"
                },
            },
            fname: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: "Please enter a firstname"
                },
            },
            lname: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: "Please enter a lastname"
                },
            },
            branchName: {
                type: DataTypes.STRING,
                allowNull: {
                    args: false,
                    msg: "Please enter a branch name"
                },
            },
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            createdDate: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            roleGroupId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: false
        }
    );
    return User;
};
