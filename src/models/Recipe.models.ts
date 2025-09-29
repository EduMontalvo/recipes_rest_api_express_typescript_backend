import { ENUM } from 'sequelize'
import { Table, Column, Model, DataType, Default, AllowNull } from 'sequelize-typescript'

@Table({
    tableName: 'recipes'
})

class Recipe extends Model {
    @Column({
        type: DataType.STRING(50)
    })
    declare name: string
    @Column({
        type: DataType.INTEGER
    })
    declare quantity: number
    @Column({
        type: DataType.STRING(2000)
    })
    declare ingredients: string
    @Column({
        type: DataType.STRING(2000)
    })
    declare preparation: string
    @Column({
        type: DataType.STRING(2000),
        allowNull: true
    })
    declare imageURL?: string
    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare revised: boolean
    @Column({
        type: DataType.ENUM('Facil','Intermedio','Dificil'),
        allowNull:true
    })
    declare difficulty: 'Facil' | 'Intermedio' | 'Dificil'
}

export default Recipe