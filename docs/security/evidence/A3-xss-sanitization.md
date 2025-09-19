### Evidence A3: Unsanitized HTML rendering

Occurrences:

```
frontend/src/components/modules/EditableSection.tsx: dangerouslySetInnerHTML
frontend/src/pages/PublicBlog.tsx: dangerouslySetInnerHTML
```

Target remediation:
- Introduce a `SafeHtml` component using DOMPurify
- Replace direct uses of `dangerouslySetInnerHTML`
- Add unit tests for `<script>` and `onerror` stripping

