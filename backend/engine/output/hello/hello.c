void _start(int param2, int param1);

// address: 0x1191
void proc1(int param4, int param1, int param3, int param2) {
    int local0; 		// r28

    *(int*)(local0 - 4) = param1;
    *(int*)(local0 - 8) = param1;
    *(int*)(local0 - 12) = local0 - 8;
    *(int*)(local0 - 16) = param2;
    *(int*)(local0 - 20) = param3;
    *(int*)(local0 - 24) = param4;
}

// address: 0x1411
void _start(int param2, int param1) {
    int local0; 		// r28

    *(int*)(local0 - 4) = param1;
    *(int*)*(int*)0x8361 = 0;
    proc1(pc, param1, *(int*)0x8361, local0 - 4, 0, LOGICALFLAGS32(param2 - 3), LOGICALFLAGS32(param2 - 3));
    return;
}

