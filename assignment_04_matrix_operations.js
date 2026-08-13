// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

// Read a positive whole number, such as a row or column count.
function readPositiveInteger(prompt) {
    let value;

    do {
        value = Number(readlineSync.question(prompt));
        if (!Number.isInteger(value) || value <= 0) {
            console.log('Please enter a positive whole number.');
        }
    } while (!Number.isInteger(value) || value <= 0);

    return value;
}

// Read a matrix one row at a time and ensure every row has the right length.
function readMatrix(rows, columns, name) {
    const matrix = [];
    console.log(`\nEnter the values for matrix ${name}:`);

    for (let i = 0; i < rows; i++) {
        let row;

        do {
            const input = readlineSync.question(`Enter row ${i + 1} (${columns} values): `).trim();
            row = input.split(/\s+/).map(Number);

            if (row.length !== columns || row.some(Number.isNaN)) {
                console.log(`Please enter exactly ${columns} numeric value(s), separated by spaces.`);
                row = null;
            }
        } while (row === null);

        matrix.push(row);
    }

    return matrix;
}

// Display a matrix with its columns aligned.
function displayMatrix(matrix, title) {
    console.log(`\n${title}`);
    const widths = [];

    for (let column = 0; column < matrix[0].length; column++) {
        let width = 0;
        for (let row = 0; row < matrix.length; row++) {
            width = Math.max(width, String(matrix[row][column]).length);
        }
        widths.push(width);
    }

    for (let row = 0; row < matrix.length; row++) {
        let line = '';
        for (let column = 0; column < matrix[row].length; column++) {
            line += String(matrix[row][column]).padStart(widths[column] + 1);
        }
        console.log(line.trimStart());
    }
}

// Part A: exchange rows and columns.
function transposeMatrix(matrix) {
    const transposed = [];

    for (let column = 0; column < matrix[0].length; column++) {
        transposed[column] = [];
        for (let row = 0; row < matrix.length; row++) {
            transposed[column][row] = matrix[row][column];
        }
    }

    return transposed;
}

// Part B: add corresponding elements of two equally sized matrices.
function addMatrices(matrixA, matrixB) {
    const sum = [];

    for (let row = 0; row < matrixA.length; row++) {
        sum[row] = [];
        for (let column = 0; column < matrixA[row].length; column++) {
            sum[row][column] = matrixA[row][column] + matrixB[row][column];
        }
    }

    return sum;
}

// Part C: multiply an M x N matrix by an N x P matrix.
function multiplyMatrices(matrixA, matrixB) {
    const product = [];

    for (let row = 0; row < matrixA.length; row++) {
        product[row] = [];
        for (let column = 0; column < matrixB[0].length; column++) {
            let total = 0;
            for (let index = 0; index < matrixA[0].length; index++) {
                total += matrixA[row][index] * matrixB[index][column];
            }
            product[row][column] = total;
        }
    }

    return product;
}

function main() {
    console.log('Matrix Operations');

    console.log('\nPart A: Transpose a Matrix');
    const transposeRows = readPositiveInteger('Enter number of rows: ');
    const transposeColumns = readPositiveInteger('Enter number of columns: ');
    const transposeInput = readMatrix(transposeRows, transposeColumns, 'for transposition');
    displayMatrix(transposeInput, 'Original Matrix:');
    displayMatrix(transposeMatrix(transposeInput), 'Transposed Matrix:');

    console.log('\nPart B: Add Two Matrices');
    const addRows = readPositiveInteger('Enter number of rows: ');
    const addColumns = readPositiveInteger('Enter number of columns: ');
    const addMatrixA = readMatrix(addRows, addColumns, 'A');
    const addMatrixB = readMatrix(addRows, addColumns, 'B');
    displayMatrix(addMatrixA, 'Matrix A:');
    displayMatrix(addMatrixB, 'Matrix B:');
    displayMatrix(addMatrices(addMatrixA, addMatrixB), 'Sum of A and B:');

    console.log('\nPart C: Multiply Two Matrices');
    const multiplyRowsA = readPositiveInteger('Enter number of rows for matrix A: ');
    const multiplyColumnsA = readPositiveInteger('Enter number of columns for matrix A: ');
    const multiplyColumnsB = readPositiveInteger('Enter number of columns for matrix B: ');
    const multiplyMatrixA = readMatrix(multiplyRowsA, multiplyColumnsA, 'A');
    const multiplyMatrixB = readMatrix(multiplyColumnsA, multiplyColumnsB, 'B');
    displayMatrix(multiplyMatrixA, 'Matrix A:');
    displayMatrix(multiplyMatrixB, 'Matrix B:');
    displayMatrix(multiplyMatrices(multiplyMatrixA, multiplyMatrixB), 'Product A x B:');
}

main();

