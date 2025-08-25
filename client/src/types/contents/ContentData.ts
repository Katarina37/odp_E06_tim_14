import type { ContentDto } from "../../models/contents/ContentDto";
import type { ResponseData } from "./ResponseData";

export interface ContentData extends ResponseData {
    data: ContentDto
}

export interface ContentsData extends ResponseData {
    data: ContentDto[]
}