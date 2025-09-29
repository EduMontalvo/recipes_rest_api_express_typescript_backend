import { Router } from "express"
import { createRecipe, deleteRecipe, getRecipeByID, getRecipes, updateRecipe, updateRevised } from "./handlers/recipe"
import { body, param } from "express-validator"
import { handleInputErrors } from "./middleware"

const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Recipes:
 *              type: object
 *              properties:
 *                  id:
 *                      type: number
 *                      description: The recipe id
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The recipe name
 *                      example: Lomo Saltado
 *                  quantity:
 *                      type: number
 *                      description: The recipe quantity 
 *                      example: 12
 *                  ingredients:
 *                      type: string
 *                      description: The recipe ingredients
 *                      example: 500g de lomo de res     
 *                  preparation:
 *                      type: string,
 *                      description: The recipe preparation
 *                      example: Corta el lomo de res en tiras
 *                  revised:
 *                      type: boolean
 *                      description: If the recipe was revised (true)
 *                      example: true
 *                  
 */

//? Get todos las recetas
/**
 * @swagger
 * /api/recipes:
 *  get:
 *      summary: Get a list of recipes
 *      tags:
 *          - Recipes
 *      description: This returns all the recipes found in the database
 *      responses:
 *          200:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Recipes'
 * 
 */

router.get('/', getRecipes)
/**
 * @swagger
 * /api/recipes/{id}:
 *  get:
 *      summary: Get recipe by id
 *      tags:
 *          - Recipes
 *      description: This returns a recipe , by its id 
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of the recipe
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Recipes'
 *              400:
 *                  description: Bad Reques
 *              404:
 *                  description: Not found
 * 
 */
router.get('/:id',
    param('id').isInt().withMessage('El id no es valido'),
    handleInputErrors,
    getRecipeByID)

/**
 * @swagger
 * /api/recipes:
 *  post:
 *      summary: Post send a recipe to DB
 *      tags:
 *          - Recipes
 *      description: This creates a new recipe in the recipe list 
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Lomo Saltado 
 *                          quantity:
 *                              type: integer
 *                              example: 12
 *                          ingredients:
 *                              type: string
 *                              example: 500g de lomo de res, 2 cucharadas de   aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)
 *                          preparation:
 *                              type: string
 *                              example: Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco.
 *      responses:
 *          201:
 *              description: Successful response
 *          400:
 *              description: Bad Request
 */
router.post('/',
    body('name')
        .notEmpty().withMessage('El campo name no puede ir vacio')
        .isString().withMessage('El campo name no puede ser un numero'),
    body('quantity')
        .notEmpty().withMessage('EL campo quantity no puede ir vacio')
        .bail()
        .isNumeric().withMessage('El campo quantity no puede ser un texto')
        .bail()
        .custom(value => value > 0).withMessage('El campo no valido'),
    body('ingredients')
        .notEmpty().withMessage('El campo ingredient no puede ir vacio')
        .isString().withMessage('El campo ingredients no puede ser un numero'),
    body('preparation')
        .notEmpty().withMessage('El campo preparation no puede ir vacio')
        .isString().withMessage('El campo preparation no puede ser un numero'),
    body('difficulty')
        .notEmpty().withMessage('El campo difficulty no puede ir vacio'),
    handleInputErrors,
    createRecipe)
/**
 * @swagger
 * /api/recipes/{id}:
 *  put:
 *      summary: Update a recipe by id
 *      tags:
 *          - Recipes
 *      description: This updates a recipe from the recipe list , by its id
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique id of the recipe
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: Lomo Saltado 
 *                          quantity:
 *                              type: integer
 *                              example: 12
 *                          ingredients:
 *                              type: string
 *                              example: 500g de lomo de res, 2 cucharadas de   aceite, 1 cebolla roja cortada en plumas, 2 tomates cortados en gajos, 1 ají amarillo (opcional) cortado en tiras, 2 cucharadas de salsa de soja, 1 cucharada de vinagre, sal y pimienta al gusto, cilantro picado (para decorar), papas fritas (para acompañar), arroz blanco (para acompañar)
 *                          preparation:
 *                              type: string
 *                              example: Corta el lomo de res en tiras. En una sartén grande, calienta el aceite y dora la carne a fuego alto. Agrega la cebolla y el ají amarillo, y saltea por unos minutos. Incorpora los tomates y cocina por un par de minutos más. Añade la salsa de soja, el vinagre, sal y pimienta al gusto. Sirve caliente, decorado con cilantro y acompañado de papas fritas y arroz blanco.
 *                          revised:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful response
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *  
 *                          
 */
router.put('/:id',
    param('id').isInt().withMessage('El id no es valido'),
    body('name')
        .notEmpty().withMessage('El campo name no puede ir vacio')
        .isString().withMessage('El campo name no puede ser un numero'),
    body('quantity')
        .notEmpty().withMessage('EL campo quantity no puede ir vacio')
        .bail()
        .isNumeric().withMessage('El campo quantity no puede ser un texto')
        .bail()
        .custom(value => value > 0).withMessage('El campo quantity no puede ser un numero negativo'),
    body('ingredients')
        .notEmpty().withMessage('El campo ingredient no puede ir vacio')
        .isString().withMessage('El campo ingredients no puede ser un numero'),
    body('preparation')
        .notEmpty().withMessage('El campo preparation no puede ir vacio')
        .isString().withMessage('El campo preparation no puede ser un numero'),
    body('revised')
        .isBoolean().withMessage('El valor para el campo'),
    body('difficulty')
        .notEmpty().withMessage('El campo difficulty no puede ir vacio'),
    handleInputErrors,
    updateRecipe)
/**
 * @swagger
 * /api/recipes/{id}:
 *  patch:
 *      summary: Patch change revised
 *      tags:
 *          - Recipes
 *      description: This changes the “checked” property from true to false or vice-versa
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Unique id
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *          
 */
router.patch('/:id',
    param('id').isInt().withMessage('El id no es valido'),
    handleInputErrors,
    updateRevised)
/**
 * @swagger
 *  /api/recipes/{id}:
 *  delete:
 *      summary: Delete a recipe
 *      tags:
 *          - Recipes
 *      description: This removes a recipe from the list , by its id
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Unique ID    
 *          required: true
 *          schema: 
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response 
 *          400:
 *              description: Bad Request
 *          404:
 *              description: Not Found
 *               
 * 
 */
router.delete('/:id',
    param('id').isInt().withMessage('El id no es valido'),
    handleInputErrors,
    deleteRecipe)

export default router