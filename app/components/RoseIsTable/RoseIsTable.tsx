"use client";

import { DynamicHeader } from "@/sanity/schemaTypes/dynamicHeader";
import { Table } from "../Table/Table";

interface RoseIsTableProps {
  entries: DynamicHeader[];
  className?: string;
}

export function RoseIsTable({ entries, className }: RoseIsTableProps) {
  return (
    <Table className={className}>
      <Table.Header>
        <Table.HeaderRow>
          <Table.HeaderCell>Rose is</Table.HeaderCell>
        </Table.HeaderRow>
      </Table.Header>
      <Table.Body>
        {entries.map((entry) => (
          <Table.Row key={entry.replacableText}>
            <Table.Cell>{entry.replacableText}</Table.Cell>
            <Table.Cell>{entry._createdAt}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
