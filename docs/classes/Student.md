[jupiter-api](../README.md) / Student

# Class: Student

Template for a student.

**`Remarks`**

A student object is returned when the `Scraper` object
finishes retrieving data from Jupiter.

## Table of contents

### Properties

- [name](Student.md#name)
- [gpa](Student.md#gpa)
- [courses](Student.md#courses)

### Constructors

- [constructor](Student.md#constructor)

### Methods

- [toString](Student.md#tostring)

## Properties

### name

• `Readonly` **name**: `string`

#### Defined in

[models/student.ts:11](https://github.com/Wolfiej-k/jupiter-api/blob/9d6b8f8/lib/models/student.ts#L11)

___

### gpa

• `Readonly` **gpa**: `number`

#### Defined in

[models/student.ts:12](https://github.com/Wolfiej-k/jupiter-api/blob/9d6b8f8/lib/models/student.ts#L12)

___

### courses

• `Readonly` **courses**: [`Course`](Course.md)[]

#### Defined in

[models/student.ts:13](https://github.com/Wolfiej-k/jupiter-api/blob/9d6b8f8/lib/models/student.ts#L13)

## Constructors

### constructor

• **new Student**(`name`, `courses`)

Constructs a `Student` object and calculates GPA.

**`Remarks`**

All courses with name "Phys Ed" are excluded from
GPA calculations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | Name of student |
| `courses` | [`Course`](Course.md)[] | All student courses |

#### Defined in

[models/student.ts:25](https://github.com/Wolfiej-k/jupiter-api/blob/9d6b8f8/lib/models/student.ts#L25)

## Methods

### toString

▸ **toString**(): `string`

JSON representation of the `Student` instance.

#### Returns

`string`

String-ified fields and subfields

#### Defined in

[models/student.ts:45](https://github.com/Wolfiej-k/jupiter-api/blob/9d6b8f8/lib/models/student.ts#L45)
