"use client";

import React from "react";
import { useRouter } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@amaxa/ui/select";
import { toast } from "@amaxa/ui/toast";

import { ProjectRoles } from "~/lib/types";
import { api } from "~/trpc/react";

export const UpdateRole = (props: {
  roles: ProjectRoles;
  projectId: string;
  userId: string;
}) => {
  const { roles, projectId, userId } = props;
  const utils = api.useUtils();
  const router = useRouter();

  const { mutate: update } = api.users.updateProjectStatus.useMutation({
    onSuccess: () => {
      utils.users.findUsersForProject.invalidate();
      router.refresh();
    },
    onError() {
      toast.error("Error");
    },
  });

  function onSubmit(e: string) {
    const permission = e as ProjectRoles;
    console.log(permission);
    update({
      projectId,
      userId,
      permission,
    });
  }
  return (
    <div>
      <Select defaultValue={roles} onValueChange={(e) => onSubmit(e)}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="student">Student</SelectItem>
          <SelectItem value="coach">Coach</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
