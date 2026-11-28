import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateThreadDto } from './create-thread.dto.js';

// Helper What it does: OmitType removes author
// PartialType:	Makes title and body optional

// export class UpdateThreadDto extends PartialType(
//   OmitType(CreateThreadDto, ['author'] as const),
//   { skipNullProperties: false },
// ) {}

// PATCH darf ausschließlich title und body verändern.
export class UpdateThreadDto extends PartialType(
    PickType(CreateThreadDto, ["title", "body"])) 
{}

