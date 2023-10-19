export interface ChatbotQuestionResult {
    status:   "SUCCESS" | "FAILURE" | "ERROR" | "NO_QUESTION_PROVIDED";
    message:  string;
    metadata?: ChatbotQuestionResultMetadata;
}

export interface ChatbotQuestionResultMetadata {
    text:            string;
    sourceDocuments: SourceDocument[];
}

export interface SourceDocument {
    pageContent: string;
    metadata:    SourceDocumentMetadata;
}

export interface SourceDocumentMetadata {
    "loc.lines.from": number;
    "loc.lines.to":   number;
}
