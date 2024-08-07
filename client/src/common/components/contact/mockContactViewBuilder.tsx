// src/common/components/MockContactViewBuilder.tsx
import React from 'react';
import { observer } from 'mobx-react';
import { MockContactViewModel } from './mockContactViewModel';

export function MockContactViewBuilder() {
    return observer(({ viewModel }: { viewModel: MockContactViewModel }) => (
        <MockContactView viewModel={viewModel} />
    ));
}

export const MockContactView = MockContactViewBuilder();
