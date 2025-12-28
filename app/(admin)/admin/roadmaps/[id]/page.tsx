import dbConnect from "../../../../../lib/db";
import Roadmap from "../../../../../models/Roadmap";
import { notFound } from "next/navigation";
import { updateRoadmap } from "../../../../../actions/admin-roadmaps";
import { addStep, deleteStep, addResource, deleteResource } from "../../../../../actions/admin-roadmaps";
import { moveStep } from "../../../../../actions/admin-roadmaps";
import { moveResource } from "../../../../../actions/admin-roadmaps";
import { updateStep } from "../../../../../actions/admin-roadmaps";
import { updateResource } from "../../../../../actions/admin-roadmaps";


interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditRoadmapPage({ params }: PageProps) {
  const { id } = await params;

  await dbConnect();

  const roadmapDoc = await Roadmap.findById(id);

  if (!roadmapDoc) {
    notFound();
  }

  const roadmap = JSON.parse(JSON.stringify(roadmapDoc));

  if (!roadmap) {
    notFound();
  }

 return (
   <div className="space-y-14">
     {/* Header */}
     <div className="mb-6">
       <a
         href="/admin"
         className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-200 transition"
       >
         ← Back to Admin
       </a>
     </div>

     <header className="space-y-2">
       <h1 className="text-2xl font-semibold tracking-tight">Edit Roadmap</h1>
       <p className="text-sm text-neutral-400">
         Manage roadmap details, steps, and resources.
       </p>
     </header>

     {/* Roadmap Info */}
     <section className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 space-y-4">
       <h2 className="text-sm font-medium text-neutral-200">
         Roadmap information
       </h2>

       <form action={updateRoadmap} className="grid gap-3 max-w-md">
         <input type="hidden" name="roadmapId" value={roadmap._id.toString()} />

         <input
           type="text"
           name="title"
           defaultValue={roadmap.title}
           className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:border-neutral-600"
           required
         />

         <input
           type="text"
           name="domain"
           defaultValue={roadmap.domain}
           className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:border-neutral-600"
           required
         />

         <input
           type="text"
           name="slug"
           defaultValue={roadmap.slug}
           className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:border-neutral-600"
           required
         />

         <button
           type="submit"
           className="mt-2 w-fit rounded bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-white transition"
         >
           Save changes
         </button>
       </form>
     </section>

     {/* Steps */}
     <section className="space-y-6">
       <div className="flex items-center justify-between">
         <h2 className="text-sm font-medium text-neutral-200">Steps</h2>
       </div>

       {/* Add Step */}
       <form
         action={addStep}
         className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 grid gap-3 max-w-md"
       >
         <input type="hidden" name="roadmapId" value={roadmap._id.toString()} />

         <input
           type="text"
           name="title"
           placeholder="Step title"
           className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
           required
         />

         <textarea
           name="description"
           placeholder="Short description (optional)"
           rows={3}
           className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
         />

         <button
           type="submit"
           className="mt-1 w-fit rounded bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-white transition"
         >
           Add step
         </button>
       </form>

       {/* Existing Steps */}
       <div className="space-y-4">
         {roadmap.steps.map((step: any, index: number) => (
           <div
             key={step._id.toString()}
             className="rounded-lg border border-neutral-800 bg-neutral-900 p-6 space-y-4"
           >
             {/* Step Header */}
             <div className="flex items-start justify-between gap-6">
               <form action={updateStep} className="space-y-2 flex-1">
                 <input
                   type="hidden"
                   name="roadmapId"
                   value={roadmap._id.toString()}
                 />
                 <input
                   type="hidden"
                   name="stepId"
                   value={step._id.toString()}
                 />

                 <input
                   type="text"
                   name="title"
                   defaultValue={step.title}
                   className="w-full rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:border-neutral-600"
                   required
                 />

                 <textarea
                   name="description"
                   defaultValue={step.description}
                   rows={2}
                   className="w-full rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-sm focus:outline-none focus:border-neutral-600"
                 />

                 <button
                   type="submit"
                   className="text-xs text-neutral-300 hover:text-white transition"
                 >
                   Save step
                 </button>
               </form>

               {/* Step Actions */}
               <div className="flex flex-col items-end gap-2 text-xs">
                 <form
                   action={async () => {
                     "use server";
                     await moveStep(
                       roadmap._id.toString(),
                       step._id.toString(),
                       "up"
                     );
                   }}
                 >
                   <button className="text-neutral-400 hover:text-white">
                     ↑
                   </button>
                 </form>

                 <form
                   action={async () => {
                     "use server";
                     await moveStep(
                       roadmap._id.toString(),
                       step._id.toString(),
                       "down"
                     );
                   }}
                 >
                   <button className="text-neutral-400 hover:text-white">
                     ↓
                   </button>
                 </form>

                 <form action={deleteStep}>
                   <input
                     type="hidden"
                     name="roadmapId"
                     value={roadmap._id.toString()}
                   />
                   <input
                     type="hidden"
                     name="stepId"
                     value={step._id.toString()}
                   />
                   <button className="text-neutral-500 hover:text-red-400 transition">
                     Delete
                   </button>
                 </form>
               </div>
             </div>

             {/* Resources */}
             <div className="space-y-3">
               {step.resources.map((res: any) => (
                 <div
                   key={res._id?.toString()}
                   className="flex items-center justify-between gap-4 text-sm"
                 >
                   <form
                     action={updateResource}
                     className="flex gap-2 flex-wrap"
                   >
                     <input
                       type="hidden"
                       name="roadmapId"
                       value={roadmap._id.toString()}
                     />
                     <input
                       type="hidden"
                       name="stepId"
                       value={step._id.toString()}
                     />
                     <input
                       type="hidden"
                       name="resourceId"
                       value={res._id?.toString()}
                     />

                     <input
                       name="title"
                       defaultValue={res.title}
                       className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs"
                     />

                     <input
                       name="url"
                       defaultValue={res.url}
                       className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs"
                     />

                     <select
                       name="type"
                       defaultValue={res.type}
                       className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs"
                     >
                       <option value="article">Article</option>
                       <option value="video">Video</option>
                       <option value="tool">Tool</option>
                     </select>

                     <button className="text-xs text-neutral-300 hover:text-white">
                       Save
                     </button>
                   </form>

                   <div className="flex gap-2 text-xs">
                     <form
                       action={async () => {
                         "use server";
                         await moveResource(
                           roadmap._id.toString(),
                           step._id.toString(),
                           res._id.toString(),
                           "up"
                         );
                       }}
                     >
                       <button className="text-neutral-400 hover:text-white">
                         ↑
                       </button>
                     </form>

                     <form
                       action={async () => {
                         "use server";
                         await moveResource(
                           roadmap._id.toString(),
                           step._id.toString(),
                           res._id.toString(),
                           "down"
                         );
                       }}
                     >
                       <button className="text-neutral-400 hover:text-white">
                         ↓
                       </button>
                     </form>

                     <form action={deleteResource}>
                       <input
                         type="hidden"
                         name="roadmapId"
                         value={roadmap._id.toString()}
                       />
                       <input
                         type="hidden"
                         name="stepId"
                         value={step._id.toString()}
                       />
                       <input
                         type="hidden"
                         name="resourceId"
                         value={res._id?.toString()}
                       />
                       <button className="text-neutral-500 hover:text-red-400">
                         Delete
                       </button>
                     </form>
                   </div>
                 </div>
               ))}

               {/* Add Resource */}
               <form
                 action={addResource}
                 className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-2"
               >
                 <input
                   type="hidden"
                   name="roadmapId"
                   value={roadmap._id.toString()}
                 />
                 <input
                   type="hidden"
                   name="stepId"
                   value={step._id.toString()}
                 />

                 <input
                   name="title"
                   placeholder="Title"
                   className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs"
                   required
                 />
                 <input
                   name="url"
                   placeholder="URL"
                   className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs"
                   required
                 />
                 <select
                   name="type"
                   className="rounded border border-neutral-800 bg-neutral-950 px-2 py-1 text-xs"
                   required
                 >
                   <option value="">Type</option>
                   <option value="article">Article</option>
                   <option value="video">Video</option>
                   <option value="tool">Tool</option>
                 </select>

                 <button className="text-xs text-neutral-300 hover:text-white">
                   Add
                 </button>
               </form>
             </div>
           </div>
         ))}
       </div>
     </section>
   </div>
 );
}
