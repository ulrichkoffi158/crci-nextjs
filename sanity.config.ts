import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemas } from './schemas'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export default defineConfig({
  name: 'crci-studio',
  title: 'CRCI – Studio de contenu',
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            S.listItem()
              .title('Actualités')
              .child(S.documentTypeList('article').title('Tous les articles')),
            S.listItem()
              .title('Galerie photos')
              .child(S.documentTypeList('photo').title('Toutes les photos')),
            S.listItem()
              .title('Formations')
              .child(S.documentTypeList('formation').title('Toutes les formations')),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemas },
})
